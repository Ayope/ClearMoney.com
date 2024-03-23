import { ApiProperty } from '@nestjs/swagger';

export class ResponseReportsDto {
  /*
    - how many expenses, revenues, daily expenses on each category
    - how many categories, expenses, revenues, daily expenses a user have
    - total of daily expenses on each month
    - percentage achieved of each goal
  */

  @ApiProperty({
    description: 'The total expenses by category',
    type: 'array',
    items: {
      type: 'object',
      properties: { category: { type: 'string' }, count: { type: 'number' }, total: { type: 'number' } },
    },
  })
  ExpensesByCategory: { category: string; count: number; total: number }[];

  @ApiProperty({
    description: 'The total revenues by category',
    type: 'array',
    items: {
      type: 'object',
      properties: { category: { type: 'string' }, count: { type: 'number' }, total: { type: 'number' } },
    },
  })
  RevenuesByCategory: { category: string; count: number; total: number }[];

  @ApiProperty({
    description: 'The total daily expenses by category',
    type: 'array',
    items: {
      type: 'object',
      properties: { category: { type: 'string' }, count: { type: 'number' }, total: { type: 'number' } },
    },
  })
  DailyExpensesByCategory: { category: string; count: number; total: number }[];

  @ApiProperty({
    description: 'The user stats',
    type: 'object',
    properties: {
      categoriesCount: { type: 'number' },
      expensesCount: { type: 'number' },
      revenuesCount: { type: 'number' },
      dailyExpensesCount: { type: 'number' },
    },
  })
  userStats: {
    categoriesCount: number;
    expensesCount: number;
    revenuesCount: number;
    dailyExpensesCount: number;
  };

  @ApiProperty({
    description: 'The total daily expenses by month',
    type: 'array',
    items: {
      type: 'object',
      properties: { month: { type: 'string' }, total: { type: 'number' } },
    },
  })
  totalDailyExpensesByMonth: { month: string; total: number }[];

  @ApiProperty({
    description: 'The achievement of each goal',
    type: 'array',
    items: {
      type: 'object',
      properties: { goal: { type: 'string' }, achievement: { type: 'number' } },
    },
  })
  goalsAchievement: { goal: string; achievement: number }[];
}
