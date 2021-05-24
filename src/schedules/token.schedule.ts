import { RedisService } from '$connections/redis.provider';
import { TokenEntity } from '$entities/Token.entity';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';

@Injectable()
export class TokenSchedule {
  private readonly logger = new Logger(TokenSchedule.name);

  constructor(
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
    private readonly redisService: RedisService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCronTest() {
    await this.tokenRepository.delete({ expires: LessThan(new Date()) });
  }
}
