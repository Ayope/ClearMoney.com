export class ResponseReportsDto {
    /*
        - how much expenses, revenues, daily expenses on each category
        - how many categories, expenses, revenues, daily expenses a user have
        - total of daily expenses on each month
        - percentage achieved of each goal
    */ 

    expensesByCategory: { [category: string]: number };
    revenuesByCategory: { [category: string]: number };
    dailyExpensesByCategory: { [category: string]: number };
    userStats: {
        categoriesCount: number;
        expensesCount: number;
        revenuesCount: number;
        dailyExpensesCount: number;
    };
    totalDailyExpensesByMonth: { [month: string]: number };
    goalAchievement: { [goal: string]: number };
}