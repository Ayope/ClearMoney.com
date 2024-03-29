import { Module, OnModuleInit } from '@nestjs/common';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { FirebaseAuthService } from './firebase-auth.service';
import { IAuthRepository } from '@/core/abstracts/auth-services/auth-repository.abstract';
import * as admin from 'firebase-admin'
import { FIREBASE_CONFIGURATION } from '@/configuration/firebase.config';
import { FIREBASE_ADMIN_CONFIGURATION }  from '@/configuration/firebaseAdmin.config';

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
      provide: 'FIREBASE_ADMIN',
      useFactory: () => {
        const serviceAccount = FIREBASE_ADMIN_CONFIGURATION();
        if (!admin.apps.length) {
          admin.initializeApp({
            credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
          });
        }
        return admin;
      }
    },
    {
      provide: IAuthRepository,
      useClass: FirebaseAuthService,
    },
  ],
  exports: [IAuthRepository],
})
export class FirebaseModule {}