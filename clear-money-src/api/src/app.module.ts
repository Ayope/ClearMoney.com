import { Module } from '@nestjs/common';
import { AuthController } from './controllers';
import { DataServicesModule } from './services/data-services/data-services.module'; 
import { ConfigModule } from '@nestjs/config';
import { AuthServicesModule } from './services';
import { UserUseCasesModule } from './use-cases/user/user-use-cases.module';
import { AuthUseCasesModule } from './use-cases/auth/auth-use-cases.module';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    DataServicesModule,
    AuthServicesModule,
    AuthUseCasesModule,
    UserUseCasesModule
  ],
  controllers: [
    AuthController
  ],
  providers: [],
})
export class AppModule {}
