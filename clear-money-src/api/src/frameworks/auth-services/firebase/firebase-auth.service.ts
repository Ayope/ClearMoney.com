import { Injectable, Inject } from '@nestjs/common';
import { Auth, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { IAuthRepository } from '@/core/abstracts/auth-services/auth-repository.abstract';

@Injectable()
export class FirebaseAuthService implements IAuthRepository {
  constructor(@Inject('FIREBASE_AUTH') private auth: Auth) {}

  async signup(email: string, password: string) {
    return await createUserWithEmailAndPassword(this.auth, email, password);   
  }

  async login(email: string, password: string) {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }
}
