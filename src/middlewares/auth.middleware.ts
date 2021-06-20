import { Injectable, Logger, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { RedisService } from 'connections/redis.provider';
import { TokenEntity } from '$entities/Token.entity';
import { TokenService } from '$services/common/token.service';
import { UserEntity } from '$entities/User.entity';
import { UserService } from '$services/common/user.service';
import { UserDto } from '$models/auth/CurrentUser.dto';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly logger: Logger = new Logger(AuthMiddleware.name);
  private readonly userService: UserService;
  private readonly redisService: RedisService;
  private readonly tokenService: TokenService;

  constructor(userService: UserService, redisService: RedisService, tokenService: TokenService) {
    this.userService = userService;
    this.redisService = redisService;
    this.tokenService = tokenService;
  }

  async use(req: Request, res: Response, next: NextFunction) {
    if (req.originalUrl === '/') return res.redirect('/api/docs');

    let accessToken = req.headers.authorization?.replace('Bearer ', '');

    if (accessToken) {
      try {
        let token = await this.redisService.get<TokenEntity>(`Token:${accessToken}`);
        if (!token) {
          token = await this.tokenService.findByAccessToken(accessToken);

          if (!token) return next();
        }

        if (token.expires < new Date()) {
          await this.redisService.del(`Token:${accessToken}`);
          throw new UnauthorizedException('error.TokenExpired');
        }

        await this.redisService.set(`Token:${accessToken}`, token);
        let user = await this.redisService.get<UserEntity>(`User:${token.userId}`);
        if (!user) {
          user = await this.userService.getById(token.userId);
          await this.redisService.set(`User:${token.userId}`, user);
        }

        req.accessToken = accessToken;
        req.currentUserId = user.id;
        req.currentUser = new UserDto(user);
      } catch (error) {
        this.logger.error(error.message);
        throw new UnauthorizedException(error.message);
      }
    }

    return next();
  }
}
