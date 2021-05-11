import config from '$config';
import { TokenEntity } from '$entities/Token';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class TokenService {
  private readonly logger: Logger = new Logger(TokenService.name);
  constructor(
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
    private readonly connection: Connection,
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
}
