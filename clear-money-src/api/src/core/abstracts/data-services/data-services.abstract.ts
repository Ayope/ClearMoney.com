import { User, FinancialTransaction, DailyExpense, Category, Goal } from '../../entities';
import { IGenericRepository } from './generic-repository.abstract';

export abstract class IDataServices {

  abstract Users: IGenericRepository<User>;

  abstract FinancialTransactions: IGenericRepository<FinancialTransaction>;

  abstract DailyExpenses: IGenericRepository<DailyExpense>;
  
  abstract Categories: IGenericRepository<Category>;

  abstract Goals : IGenericRepository<Goal>;
}
