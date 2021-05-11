import config from '$config';
import { TokenEntity } from '$entities/Token';
import { UserEntity } from '$entities/Users';
import { CurrentUser } from '$models/auth.dto';
import { TokenService } from '$services/token.service';
import { UserService } from '$services/user.service';
import { Injectable, Logger, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { RedisService } from 'connections/redis.provider';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private logger: Logger = new Logger(AuthMiddleware.name);
  private readonly userService: UserService;
  private readonly redisService: RedisService;
  private readonly tokenService: TokenService;

  constructor(userService: UserService, redisService: RedisService, tokenService: TokenService) {
    this.userService = userService;
    this.redisService = redisService;
    this.tokenService = tokenService;
  }

  async use(req: Request, res: Response, next: NextFunction) {
    let accessToken = req.headers.authorization?.replace('Bearer ', '');

    // * Handle: Bearer JWT
    // if (accessToken) {
    //   try {
    //     const decoded = verify(accessToken, config.ENV.ACCESS_TOKEN_SECRET)
    //     let user = await this.redisService.get<UserEntity>(`User:${decoded.userId}`)
    //     if(!user){
    //       user = await this.userService.getById(decoded.userId);
    //       await this.redisService.set(`User:${decoded.userId}`, user)
    //     }
    //     req.currentUserId = user.id;
    //     req.currentUser = new CurrentUser(user);
    //   }
    //   catch (error) {
    //     this.logger.error(error.message)
    //     throw new UnauthorizedException(error.message)
    //   }
    // }

    // * Handle: Custom Bearer
    if (accessToken) {
      try {
        let token = await this.redisService.get<TokenEntity>(`Token:${accessToken}`);
        if (!token) {
          token = await this.tokenService.findByAccessToken(accessToken);

          if (!token) return next();

          await this.redisService.set(`Token:${accessToken}`, token);
        }

        if (token.expires < new Date()) throw new UnauthorizedException('error.TokenExpired');
        let user = await this.redisService.get<UserEntity>(`User:${token.userId}`);
        if (!user) {
          user = await this.userService.getById(token.userId);
          await this.redisService.set(`User:${token.userId}`, user);
        }
        req.currentUserId = user.id;
        req.currentUser = new CurrentUser(user);
      } catch (error) {
        this.logger.error(error.message);
        throw new UnauthorizedException(error.message);
      }
    }

    return next();
  }
}
