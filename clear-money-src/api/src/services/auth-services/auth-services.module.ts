import { Module } from '@nestjs/common';
import { FirebaseModule } from '@/frameworks/auth-services/firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  exports: [FirebaseModule],
})
export class AuthServicesModule {}
