export class ResponseReportsDto {
    /*
        - how much expenses, revenues, daily expenses on each category
        - how many categories, expenses, revenues, daily expenses a user have
        - total of daily expenses on each month
        - percentage achieved of each goal
    */ 

    totalExpensesByCategory: { 
        category: string
        total : number 
    }[];
    totalRevenuesByCategory: { 
        category: string
        total : number 
    }[];
    totalDailyExpensesByCategory: { 
        category: string
        total : number 
    }[];
    userStats: {
        categoriesCount: number;
        expensesCount: number;
        revenuesCount: number;
        dailyExpensesCount: number;
    };
    totalDailyExpensesByMonth: { 
        month: string 
        total : number 
    }[];
    goalsAchievement: { 
        goal: string,
        achievement: number 
    }[];
}