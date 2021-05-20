import { UserEntity } from '$entities/Users';
import { RegisterDto } from '$models/user.dto';
import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, getRepository, Repository } from 'typeorm';
import { compareSync, hashSync } from 'bcryptjs';
import { TokenEntity } from '$entities/Token';
import { TokenService } from './token.service';

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly tokenService: TokenService,
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

    user = await this.userRepository.save(user);
    return user.id;
  }
  async login(email: string, password: string, userAgent: string) {
    const user = await this.userRepository.findOne({ where: { email: email } });

    if (!user) throw new BadRequestException('error.UsernameOrPasswordIncorrect');

    const isPasswordCorrect = await compareSync(password, user.passwordHash);
    if (!isPasswordCorrect) throw new UnauthorizedException('error.EmailOrPasswordInCorrect');

    return await this.tokenService.create(user.id, userAgent);
  }
}
