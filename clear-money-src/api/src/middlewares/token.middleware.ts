import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    await admin.auth().verifyIdToken(req.cookies.accessToken);
    next();
  }
}