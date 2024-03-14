import { CategoryUseCasesModule } from './use-cases/category/category-use-cases.module';
import { Module } from '@nestjs/common';
import { AuthController } from './controllers';
import { DataServicesModule } from './services/data-services/data-services.module'; 
import { ConfigModule } from '@nestjs/config';
import { AuthServicesModule } from './services';
import { UserUseCasesModule } from './use-cases/user/user-use-cases.module';
import { AuthUseCasesModule } from './use-cases/auth/auth-use-cases.module';
import { CategoryController } from './controllers/category.controller';
import { FinancialTransactionModule } from './use-cases/financial-transaction/financial-transaction-use-cases.module';
import { FinancialTransactionController } from './controllers/financial-transaction.controller';
import { DailyExpenseModule } from './use-cases/daily-expense/daily-expense-use-cases.module';
import { DailyExpenseController } from './controllers/daily-expense.controller';
import { GoalModule } from './use-cases/goal/goal-use-cases.module';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    DataServicesModule,
    AuthServicesModule,
    AuthUseCasesModule,
    UserUseCasesModule,
    CategoryUseCasesModule,
    FinancialTransactionModule,
    DailyExpenseModule,
    GoalModule
  ],
  controllers: [
    AuthController,
    CategoryController,
    FinancialTransactionController,
    DailyExpenseController
  ],
  providers: [],
})
export class AppModule {}
