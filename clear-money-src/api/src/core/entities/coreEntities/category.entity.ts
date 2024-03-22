import { DailyExpense } from "./daily-expense.entity"
import { FinancialTransaction } from "./financial-transaction.entity"
import { User } from "./user.entity"

export class Category {
    name : string
    color : string
    user : User
    // FinancialTransactions : FinancialTransaction[]
    // DailyExpenses : DailyExpense[]
}