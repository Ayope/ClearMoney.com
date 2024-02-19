import { Module } from '@nestjs/common';
import {
  AppController,
} from './controllers';
import { DataServicesModule } from './services/data-services/data-services.module'; 
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from './frameworks/auth-services/firebase/firebase.module';
import { AuthServicesModule } from './services';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    DataServicesModule,
    AuthServicesModule
  ],
  controllers: [
    AppController,
  ],
  providers: [],
})
export class AppModule {}
