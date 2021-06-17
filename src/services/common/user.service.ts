import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, getRepository, Repository } from 'typeorm';
import { compareSync, hashSync } from 'bcryptjs';
import { TokenService } from './token.service';
import { UserEntity } from '$entities/User.entity';
import { RegisterDto } from '$models/auth/Register.dto';
import { RedisService } from '$connections/redis.provider';
import { UserDto } from '$models/auth/CurrentUser.dto';
import { TokenEntity } from '$entities/Token.entity';

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly tokenService: TokenService,
    private readonly redisService: RedisService,
    private readonly connection: Connection,
  ) {}

  async getById(userId: string) {
    return await this.userRepository.findOne({ id: userId });
  }

  async create(data: RegisterDto) {
    let user = await this.userRepository.findOne({ email: data.email });
    if (user) throw new BadRequestException('error.UserExist');

    user = new UserEntity();
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.email = data.email;
    user.passwordHash = await hashSync(data.password);
    user.lastLoginDate = new Date();

    user = await this.userRepository.save(user);
    return user.id;
  }

  async login(email: string, password: string, userAgent: string) {
    const user = await this.userRepository.findOne({ email: email });

    if (!user) throw new BadRequestException('error.UsernameOrPasswordIncorrect');

    const isPasswordCorrect = await compareSync(password, user.passwordHash);
    if (!isPasswordCorrect) throw new UnauthorizedException('error.EmailOrPasswordInCorrect');

    user.lastLoginDate = new Date();

    await this.userRepository.save(user);
    await this.redisService.set(`User:${user.id}`, user);

    return await this.tokenService.create(user.id, userAgent);
  }

  async changePassword(userId: string, oldPassword: string, newPassword: string) {
    const user = await this.getById(userId);

    const isPasswordCorrect = await compareSync(oldPassword, user.passwordHash);
    if (!isPasswordCorrect) throw new UnauthorizedException('error.OldPasswordInCorrect');

    user.passwordHash = await hashSync(newPassword);

    await this.userRepository.save(user);
  }

  async findUserByAccessToken(accessToken: string) {
    let token = await this.redisService.get<TokenEntity>(`Token:${accessToken}`);
    if (!token) {
      token = await this.tokenService.findByAccessToken(accessToken);

      if (!token) return null;
    }

    if (token.expires < new Date()) {
      await this.redisService.del(`Token:${accessToken}`);
      return null;
    }

    await this.redisService.set(`Token:${accessToken}`, token);
    let user = await this.redisService.get<UserEntity>(`User:${token.userId}`);
    if (!user) {
      user = await this.getById(token.userId);
      await this.redisService.set(`User:${token.userId}`, user);
    }

    return new UserDto(user);
  }
}
