import { CategoryUseCases } from '@/use-cases/category/category.use-case';
import { DailyExpenseUseCases } from '@/use-cases/daily-expense/daily-expense.use-case';
import { FinancialTransactionUseCases } from '@/use-cases/financial-transaction/financial-transaction.use-case';
import { GoalUseCases } from '@/use-cases/goal/goal.use-case';
import { Controller, Param, Get } from '@nestjs/common';
import { ResponseReportsDto } from '@/core/dtos/responseDtos/ResponseReports.dto';
import FinancialType from '@/core/enums/financial-type.enum';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Reports')
@Controller('api/reports')
export class ReportsController {

    private responseReports : ResponseReportsDto;

    constructor(
        private CategoryUseCases : CategoryUseCases,
        private DailyExpenseUseCases : DailyExpenseUseCases,
        private financialTransactionUseCases : FinancialTransactionUseCases,
        private goalUseCases : GoalUseCases
    ){
        this.responseReports = new ResponseReportsDto();
    }
    
    private async financialTransactionsReports(userId: string) {

        const financialTransactions = await this.financialTransactionUseCases.getFinancialTransactionsByUserId(userId);
        
        let ExpensesByCategory: { category: string; count: number; total: number }[] = [];
        let RevenuesByCategory: { category: string; count: number; total: number }[] = [];
        let expensesCount = 0;
        let revenuesCount = 0;
    
        financialTransactions.forEach(transaction => {
            let category = transaction.category.name;
            let amount = transaction.amount;

            if (transaction.type === FinancialType.Expense) {
                expensesCount++;
                let expenseCategory = ExpensesByCategory.find(e => e.category === category);
                if (expenseCategory) {
                    expenseCategory.count += 1;
                    expenseCategory.total += amount;
                } else {
                    ExpensesByCategory.push({ category: category, count : 1, total: amount });
                }
            } else if (transaction.type === FinancialType.Revenue) {
                revenuesCount++;
                let revenueCategory = RevenuesByCategory.find(r => r.category === category);
                if (revenueCategory) {
                    revenueCategory.count += 1;
                    revenueCategory.total += amount;
                } else {
                    RevenuesByCategory.push({ category: category, count : 1, total: amount });
                }
            }
        });

        return { ExpensesByCategory, RevenuesByCategory, expensesCount, revenuesCount };
    }

    private async dailyExpensesReports(userId: string) {
        
        const dailyExpenses = await this.DailyExpenseUseCases.getDailyExpensesByUserId(userId);
        
        let DailyExpensesByCategory: { category: string; count: number; total: number }[] = [];
        let totalDailyExpensesByMonth: { month: string, total : number }[] = [];
        let dailyExpensesCount = dailyExpenses.length;
        
        dailyExpenses.forEach(dailyExpense => {
            
            let month = dailyExpense.date.toLocaleString('default', { month: 'long', year: 'numeric' });
            let category = dailyExpense.category.name;
            let amount = dailyExpense.amount;
                        
            let dailyExpenseCategory = DailyExpensesByCategory.find(e => e.category === category);
            if (dailyExpenseCategory) {
                dailyExpenseCategory.count += 1;
                dailyExpenseCategory.total += amount;
            } else {
                DailyExpensesByCategory.push({ category: category, count : 1, total: amount });
            }

            let monthDailyExpense = totalDailyExpensesByMonth.find(m => m.month === month);
            if (monthDailyExpense) {
                monthDailyExpense.total += amount;
            } else {
                totalDailyExpensesByMonth.push({ month: month, total: amount });
            }            
        });

        return { DailyExpensesByCategory, totalDailyExpensesByMonth, dailyExpensesCount};

    }

    private async categoryReports(userId : string){
        const categoriesCount = (await this.CategoryUseCases.getCategoriesByUserId(userId)).length;

        return {categoriesCount};
    }

    private async goalReports(userId : string){
        
        const goals = await this.goalUseCases.getGoalsByUserId(userId);
        
        let goalsAchievement: { goal: string, achievement: number }[] = [];
        
        goals.map(goal => {
            let achievement = (goal.current_amount / goal.targeted_amount) * 100;
            goalsAchievement.push({ goal: goal.name, achievement: Math.round(achievement) });
        });
        
        return {goalsAchievement};
    }

    @Get(":userId")
    @ApiOperation({ summary: 'Get reports for a specific user' })
    @ApiResponse({ status: 200, description: 'The reports have been successfully retrieved.', type: ResponseReportsDto })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiParam({ name: 'userId', description: 'The ID of the user', required: true, type: String })
    async getReports(@Param("userId") userId: string) : Promise<ResponseReportsDto> {
        
        const { ExpensesByCategory, RevenuesByCategory, expensesCount, revenuesCount} = await this.financialTransactionsReports(userId);
        const { DailyExpensesByCategory, totalDailyExpensesByMonth, dailyExpensesCount} = await this.dailyExpensesReports(userId);
        const {categoriesCount} = await this.categoryReports(userId);
        const {goalsAchievement} = await this.goalReports(userId);
        
        return {
            ExpensesByCategory,
            RevenuesByCategory,
            DailyExpensesByCategory,
            userStats: {
                categoriesCount,
                expensesCount,
                revenuesCount,
                dailyExpensesCount,
            },
            totalDailyExpensesByMonth,
            goalsAchievement
        }
    }
}