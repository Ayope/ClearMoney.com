import { CategoryUseCases } from '@/use-cases/category/category.use-case';
import { DailyExpenseUseCases } from '@/use-cases/daily-expense/daily-expense.use-case';
import { FinancialTransactionUseCases } from '@/use-cases/financial-transaction/financial-transaction.use-case';
import { GoalUseCases } from '@/use-cases/goal/goal.use-case';
import { Controller, Param, Get } from '@nestjs/common';
import { ResponseReportsDto } from '@/core/dtos/responseDtos/ResponseReports.dto';
import FinancialType from '@/core/enums/financial-type.enum';

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
        
        let totalExpensesByCategory: { category: string, total: number }[] = [];
        let totalRevenuesByCategory: { category: string, total: number }[] = [];
        let expensesCount = 0;
        let revenuesCount = 0;
    
        financialTransactions.forEach(transaction => {
            let category = transaction.category.name;
            let amount = transaction.amount;
            
            if (transaction.type === FinancialType.Expense) {
                expensesCount++;
                let expenseCategory = totalExpensesByCategory.find(e => e.category === category);
                if (expenseCategory) {
                    expenseCategory.total += amount;
                } else {
                    totalExpensesByCategory.push({ category: category, total: amount });
                }
            } else if (transaction.type === FinancialType.Revenue) {
                revenuesCount++;
                let revenueCategory = totalRevenuesByCategory.find(r => r.category === category);
                if (revenueCategory) {
                    revenueCategory.total += amount;
                } else {
                    totalRevenuesByCategory.push({ category: category, total: amount });
                }
            }
        });

        return { totalExpensesByCategory, totalRevenuesByCategory, expensesCount, revenuesCount };
    }

    private async dailyExpensesReports(userId: string) {
        
        const dailyExpenses = await this.DailyExpenseUseCases.getDailyExpensesByUserId(userId);
        
        let totalDailyExpensesByCategory: { category: string, total: number }[] = [];
        let totalDailyExpensesByMonth: { month: string, total : number }[] = [];
        let dailyExpensesCount = dailyExpenses.length;
        
        dailyExpenses.forEach(dailyExpense => {
            
            let month = dailyExpense.date.toLocaleString('default', { month: 'long', year: 'numeric' });
            let category = dailyExpense.category.name;
            let amount = dailyExpense.amount;
                        
            let expenseCategory = totalDailyExpensesByCategory.find(e => e.category === category);
            if (expenseCategory) {
                expenseCategory.total += amount;
            } else {
                totalDailyExpensesByCategory.push({ category: category, total: amount });
            }

            let monthExpense = totalDailyExpensesByMonth.find(m => m.month === month);
            if (monthExpense) {
                monthExpense.total += amount;
            } else {
                totalDailyExpensesByMonth.push({ month: month, total: amount });
            }            
        });

        return { totalDailyExpensesByCategory, totalDailyExpensesByMonth, dailyExpensesCount};

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
    async getReports(@Param("userId") userId: string) : Promise<ResponseReportsDto> {
        
        const { totalExpensesByCategory, totalRevenuesByCategory, expensesCount, revenuesCount} = await this.financialTransactionsReports(userId);
        const { totalDailyExpensesByCategory, totalDailyExpensesByMonth, dailyExpensesCount} = await this.dailyExpensesReports(userId);
        const {categoriesCount} = await this.categoryReports(userId);
        const {goalsAchievement} = await this.goalReports(userId);
        
        return {
            totalExpensesByCategory,
            totalRevenuesByCategory,
            totalDailyExpensesByCategory,
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