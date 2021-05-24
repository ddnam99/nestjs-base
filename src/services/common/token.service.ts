import config from '$config';
import { RedisService } from '$connections/redis.provider';
import { TokenEntity } from '$entities/Token.entity';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class TokenService {
  private readonly logger: Logger = new Logger(TokenService.name);
  constructor(
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
    private readonly connection: Connection,
    private readonly redisService: RedisService,
  ) {}

  async create(userId: string, userAgent: string) {
    const now = Date.now();

    return await this.tokenRepository.save({
      userId: userId,
      expires: new Date(now + config.ENV.ACCESS_TOKEN_EXPIRE),
      expiresRefresh: new Date(now + config.ENV.REFRESH_TOKEN_EXPIRE),
      userAgent: userAgent,
    });
  }

  async findByAccessToken(accessToken: string) {
    return await this.tokenRepository.findOne({ where: { accessToken: accessToken } });
  }

  async destroyToken(accessToken: string) {
    await this.tokenRepository.delete({ accessToken: accessToken });
    await this.redisService.del(`Token:${accessToken}`);
  }

  async refreshToken(userId: string, accessToken: string, refreshToken: string, userAgent: string) {
    const token = await this.findByAccessToken(accessToken);

    if (
      token.userId !== userId ||
      token.refreshToken !== refreshToken ||
      token.expiresRefresh < new Date()
    ) {
      throw new UnauthorizedException('error.RefreshTokenFailed');
    }

    await this.destroyToken(accessToken);

    return await this.create(userId, userAgent);
  }
}
