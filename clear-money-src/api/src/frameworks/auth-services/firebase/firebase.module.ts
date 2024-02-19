import { Module, OnModuleInit } from '@nestjs/common';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { FirebaseAuthService } from './firebase-auth.service';
import { IAuthRepository } from '@/core/abstracts/auth-services/auth-repository.abstract';
import { FIREBASE_CONFIGURATION } from '@/configuration/firebase.config';

@Module({
  providers: [
    {
      provide: 'FIREBASE_APP',
      useFactory: () => {
        const app = initializeApp(FIREBASE_CONFIGURATION());
        return app;
      },
    },
    {
      provide: 'FIREBASE_AUTH',
      useFactory: (app: FirebaseApp) => getAuth(app),
      inject: ['FIREBASE_APP'],
    },
    {
      provide: IAuthRepository,
      useClass: FirebaseAuthService,
    },
  ],
  exports: [IAuthRepository],
})
export class FirebaseModule {}
