import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger: Logger = new Logger(LoggerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(
      `Client ${req.method} ${req.originalUrl} with body ${JSON.stringify(req.body)}`,
    );
    return next();
  }
}
