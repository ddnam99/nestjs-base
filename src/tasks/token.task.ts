import { RedisService } from '$connections/redis.provider';
import { TokenEntity } from '$entities/Token.entity';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TokenSchedule {
  constructor(
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
    private readonly redisService: RedisService,
  ) {}
  @Cron('* * 1 * * *')
  async handleCronTest() {
    // this.logger.debug('Called when the current second is 1 hour');
    console.log('test');
  }
}
