import { UserUseCases } from "@/use-cases/user/user.use-case";
import { Controller, Get, Param, Post, Query } from "@nestjs/common";
import { faker } from '@faker-js/faker';
import { AuthUseCases } from "@/use-cases/auth/auth.use-case";
import { CategoryUseCases } from "@/use-cases/category/category.use-case";
import { CategoryFactoryService } from "@/use-cases/category/category-factory.service";
import { FinancialTransactionUseCases } from "@/use-cases/financial-transaction/financial-transaction.use-case";
import { FinancialTransactionFactoryService } from "@/use-cases/financial-transaction/financial-transaction-factory.service";
import FinancialType from "@/core/enums/financial-type.enum";
import { CreateCategoryDto, CreateDailyExpenseDto, CreateFinancialTransactionDto, CreateGoalDto } from "@/core/dtos";
import { Category, DailyExpense, FinancialTransaction, Goal, User } from "@/core";
import { DailyExpenseUseCases } from "@/use-cases/daily-expense/daily-expense.use-case";
import { DailyExpenseFactoryService } from "@/use-cases/daily-expense/daily-expense-factory.service";
import SavingFrequency from "@/core/enums/savingFrequency.enum";
import { GoalUseCases } from "@/use-cases/goal/goal.use-case";
import { GoalFactoryService } from "@/use-cases/goal/goal-factory.service";
import { IAuthRepository } from "@/core/abstracts/auth-services/auth-repository.abstract";
const bcrypt = require('bcrypt');

@Controller('seeder')
export class SeederController{
    
    private users : User[] = [];

    constructor(
        private authUseCases : AuthUseCases, 
        private userUseCases : UserUseCases,
        private categoryUseCases : CategoryUseCases,
        private CategoryFactoryService : CategoryFactoryService,
        private FinancialTransactionUseCases : FinancialTransactionUseCases,
        private FinancialTransactionFactoryService : FinancialTransactionFactoryService, 
        private DailyExpenseUseCases : DailyExpenseUseCases,
        private DailyExpenseFactoryService : DailyExpenseFactoryService,
        private GoalUseCases : GoalUseCases,
        private GoalFactoryService : GoalFactoryService,
        private authRepository : IAuthRepository
    ){}
      
    private generatePassword() {
        const length = 8;
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@$!%*?&';
        const passwordArray = Array(length).fill(null).map(() => chars[Math.floor(Math.random() * chars.length)]);
        passwordArray[0] = 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)];
        passwordArray[1] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)];
        passwordArray[2] = '0123456789'[Math.floor(Math.random() * 10)];
        passwordArray[3] = '@$!%*?&'[Math.floor(Math.random() * 7)];
        
        return passwordArray.sort(() => Math.random() - 0.5).join('');
    }

    private generateFakeUser() : User {
        return {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: this.generatePassword(),
            authServiceID : null
        }
    }

    private generateFakeCategory(user_id : string) : Category{
        const categoryDto : CreateCategoryDto = {
            name: faker.commerce.department(),
            color : faker.color.rgb(),
            user_id
        }

        const category = this.CategoryFactoryService.createNewCategory(categoryDto);

        return category
    }

    private generateFakeFinancialTransaction(category_id : string, user_id : string) : FinancialTransaction{
        const financialTypeKeys = Object.keys(FinancialType);
        const randomFinancialTypeKey = financialTypeKeys[Math.floor(Math.random() * financialTypeKeys.length)];

        const financialTransactionDto : CreateFinancialTransactionDto = {
            name: faker.finance.transactionDescription(),
            amount: parseFloat(faker.finance.amount()),
            description: faker.lorem.sentence(),
            type: FinancialType[randomFinancialTypeKey],
            category_id,
            user_id,
        };

        return this.FinancialTransactionFactoryService.createNewFinancialTransaction(financialTransactionDto)
    }

    private generateFakeDailyExpense(category_id : string, user_id : string) : DailyExpense{
        const createDailyExpenseDto : CreateDailyExpenseDto = {
            name: faker.commerce.productName(),
            amount: parseFloat(faker.commerce.price()),
            description: faker.lorem.sentence(),
            date: faker.date.past(),
            category_id,
            user_id,
        };

        return this.DailyExpenseFactoryService.createNewDailyExpense(createDailyExpenseDto);

    }

    private generateFakeGoal(user_id : string) : Goal{
        const savingFrequencyKeys = Object.keys(SavingFrequency);
        const randomSavingFrequencyKey = savingFrequencyKeys[Math.floor(Math.random() * savingFrequencyKeys.length)];
      
        let current_amount = parseFloat(faker.finance.amount());

        const createGoalDto = {
            name: faker.lorem.words(3),
            description: faker.lorem.sentence(),
            targeted_amount: current_amount + Math.abs(parseFloat(faker.finance.amount())),
            starting_date: faker.date.past(),
            saving_frequency: SavingFrequency[randomSavingFrequencyKey],
            targeted_date: faker.date.future(),
            user_id
        };
      
        let goal = this.GoalFactoryService.createNewGoal(createGoalDto);
        goal.saving_amount = Math.floor(Math.random() * current_amount),
        goal.current_amount = current_amount;
        return goal;
    }

    private async emptyDatabase(){
        await this.authRepository.deleteAllUsers();
        await this.userUseCases.deleteAllUsers();
        await this.categoryUseCases.deleteAllCategories();
        await this.FinancialTransactionUseCases.deleteAllFinancialTransactions();
        await this.DailyExpenseUseCases.deleteAllDailyExpenses();
        await this.GoalUseCases.deleteAllGoals();
    }

    @Get()
    async seed(@Query("count") count: number){

        await this.emptyDatabase();
        
        for(let i=1; i<=count; i++){
            
            const user = this.generateFakeUser();
            
            this.users.push(user);

            const authUser = await this.authUseCases.signup(user.email, user.password);
            
            user.authServiceID = authUser.user.uid;
            // user.password = await bcrypt.hash(user.password, 10)

            const createdUser = await this.userUseCases.createUser(user);
            
            for(let j=0; j<3; j++){
                const category = this.generateFakeCategory(createdUser['id']);
                const createdCategory = await this.categoryUseCases.createCategory(category);

                for(let k=0; k < 3; k++){
                    const financialTransaction = this.generateFakeFinancialTransaction(createdCategory['id'], createdUser['id']);
                    const dailyExpense = this.generateFakeDailyExpense(createdCategory['id'], createdUser['id']);
                    const goal = this.generateFakeGoal(createdUser['id']);

                    await this.FinancialTransactionUseCases.createFinancialTransaction(financialTransaction);
                    await this.DailyExpenseUseCases.createDailyExpense(dailyExpense);
                    await this.GoalUseCases.createGoal(goal);
                
                }
            }
            
        }

        return {
            message : "database was seeded successfully :)",
            users : this.users
        }
    }

}