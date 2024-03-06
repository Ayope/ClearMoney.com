import { Injectable, Inject } from '@nestjs/common';
import { Auth, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { IAuthRepository } from '@/core/abstracts/auth-services/auth-repository.abstract';

@Injectable()
export class FirebaseAuthService implements IAuthRepository {
  constructor(@Inject('FIREBASE_AUTH') private auth: Auth) {}

  signup(email: string, password: string) : Promise<any> {
    return createUserWithEmailAndPassword(this.auth, email, password);   
  }

  login(email: string, password: string) : Promise<any> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
}
