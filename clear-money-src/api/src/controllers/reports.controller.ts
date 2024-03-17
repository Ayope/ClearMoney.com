import { CategoryUseCases } from '@/use-cases/category/category.use-case';
import { DailyExpenseUseCases } from '@/use-cases/daily-expense/daily-expense.use-case';
import { FinancialTransactionUseCases } from '@/use-cases/financial-transaction/financial-transaction.use-case';
import { GoalUseCases } from '@/use-cases/goal/goal.use-case';
import { Controller, Param, Get } from '@nestjs/common';
import { ResponseReportsDto } from '@/core/dtos/responseDtos/ResponseReports.dto';

@Controller('api/reports')
export class ReportsController {


    constructor(
        private CategoryUseCases : CategoryUseCases,
        private DailyExpenseUseCases : DailyExpenseUseCases,
        private financialTransactionUseCases : FinancialTransactionUseCases,
        private goalUseCases : GoalUseCases
    ){}
    
    // private async getExpensesByCategory(userId: string) : Promise<{ [category: string]: number }> {
    //     const expenses = await this.financialTransactionUseCases.getFinancialTransaction(userId);
    // }

    @Get(":userId")
    async getReports(@Param("userId") userId: string) /*: Promise<ResponseReportsDto>*/ {
        
        const expenses = await this.financialTransactionUseCases.getFinancialTransactionsByUserId(userId);

        return expenses

        // return {
        //     expensesByCategory: {},
        //     revenuesByCategory: {},
        //     dailyExpensesByCategory: {},
        //     userStats: {
        //         categoriesCount: 0,
        //         expensesCount: 0,
        //         revenuesCount: 0,
        //         dailyExpensesCount: 0
        //     },
        //     totalDailyExpensesByMonth: {},
        //     goalAchievement: {}
        // }
    }
}