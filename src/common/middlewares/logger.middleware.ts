import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    // this.logger.log(
    //   `${req.ip} ${req.method} ${res.statusCode}`,
    //   req.originalUrl,
    // );

    // response를 로깅할 수도 있음.
    // response가 완료가 됬을 때 로깅
    res.on('finish', () => {
      this.logger.log(
        `REQ.IP: ${req.ip} REQ.HTTP Method: ${req.method} RES.statusCode: ${res.statusCode}`,
        req.originalUrl,
      );
    });
    next();
  }
}
