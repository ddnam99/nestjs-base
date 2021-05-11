import { UserService } from '$services/user.service';
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { RedisService } from 'connections/redis.provider';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private logger: Logger = new Logger("TokenService");
  private readonly userService: UserService;
  private readonly redisService: RedisService;

  constructor(userService: UserService, redisService: RedisService) {
    this.userService = userService;
    this.redisService = redisService;
  }

  async use(req: Request, res: Response, next: NextFunction) {
    let accessToken = req.headers.authorization?.replace('Bearer ', '')

    req.currentUser = null

    next();
  }
}
