import { Injectable, Inject } from '@nestjs/common';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import * as admin from "firebase-admin"
import { IAuthRepository } from '@/core/abstracts/auth-services/auth-repository.abstract';

@Injectable()
export class FirebaseAuthService implements IAuthRepository {
  constructor(
    @Inject('FIREBASE_AUTH') private auth: Auth
  ) {}

  signup(email: string, password: string) : Promise<any> {
    return createUserWithEmailAndPassword(this.auth, email, password);   
  }

  login(email: string, password: string) : Promise<any> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async deleteAllUsers() : Promise<any> {
    const listUsersResult = await admin.auth().listUsers();
    const deletionPromises = listUsersResult.users.map(userRecord => admin.auth().deleteUser(userRecord.uid));
    return Promise.all(deletionPromises);
  }

  async logout() : Promise<any> {
    return this.auth.signOut();
  }

}
