import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IDataServices } from '../../../core';
import { MONGO_CONFIGURATION } from '../../../configuration/mongo.config';
import {
  User,
  UserSchema,
  Goal,
  GoalSchema,
  Category,
  CategorySchema,
  FinancialTransaction,
  FinancialTransactionSchema,
  DailyExpense,
  DailyExpenseSchema,
} from './models';
import { MongoDataServices } from './mongo-data-services.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Goal.name, schema: GoalSchema },
      { name: Category.name, schema: CategorySchema },
      { name: FinancialTransaction.name, schema: FinancialTransactionSchema },
      { name: DailyExpense.name, schema: DailyExpenseSchema },
    ]),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: MONGO_CONFIGURATION().mongoConnectionString,
      }),
    }),
  ],
  providers: [
    {
      provide: IDataServices,
      useClass: MongoDataServices,
    },
  ],
  exports: [IDataServices],
})
export class MongoDataServicesModule {}
