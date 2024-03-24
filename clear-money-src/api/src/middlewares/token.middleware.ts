import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';
import { FirebaseError } from 'firebase/app';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try{
      await admin.auth().verifyIdToken(req.cookies.accessToken)
    }catch{
      throw new FirebaseError('auth/id-token-expired', 'The provided token is expired');
    }
    
    next();
  }
}