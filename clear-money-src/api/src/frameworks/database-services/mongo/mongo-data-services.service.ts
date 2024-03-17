import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoGenericRepository } from './mongo-generic-repository';
import { IDataServices } from 'src/core';
import {
  User,
  UserDocument,
  Goal,
  GoalDocument,
  Category,
  CategoryDocument,
  FinancialTransaction,
  FinancialTransactionDocument,
  DailyExpense,
  DailyExpenseDocument,
} from './models';

@Injectable()
export class MongoDataServices implements IDataServices, OnApplicationBootstrap {

  Users: MongoGenericRepository<User>;
  FinancialTransactions: MongoGenericRepository<FinancialTransaction>;
  DailyExpenses: MongoGenericRepository<DailyExpense>;
  Categories: MongoGenericRepository<Category>;
  Goals: MongoGenericRepository<Goal>;

  constructor(
    @InjectModel(User.name)
    private UserRepository: Model<UserDocument>,
    @InjectModel(Goal.name)
    private GoalRepository: Model<GoalDocument>,
    @InjectModel(Category.name)
    private CategoryRepository: Model<CategoryDocument>,
    @InjectModel(FinancialTransaction.name)
    private FinancialTransactionRepository: Model<FinancialTransactionDocument>,
    @InjectModel(DailyExpense.name)
    private DailyExpenseRepository: Model<DailyExpenseDocument>,
  ) {}
  
  onApplicationBootstrap() {
    this.Users = new MongoGenericRepository<User>(this.UserRepository);
    this.Goals = new MongoGenericRepository<Goal>(this.GoalRepository, ['user']);
    this.Categories = new MongoGenericRepository<Category>(this.CategoryRepository, ['user']);
    this.FinancialTransactions = new MongoGenericRepository<FinancialTransaction>(this.FinancialTransactionRepository, [
      'category', 
      'user'
    ])
    this.DailyExpenses = new MongoGenericRepository<DailyExpense>(this.DailyExpenseRepository, [
      'category',
      'user'
    ]);
  }
}
