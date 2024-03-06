import { FinancialTransaction } from "./financial-transaction.entity"
import { DailyExpense } from "./daily-expense.entity"
import { Goal } from "./goal.entity"

export class User{
    first_name : string
    last_name : string
    email : string
    password : string
    authServiceID : string
    // FinancialTransactions : FinancialTransaction[]
    // DailyExpenses : DailyExpense[]
    // Goals : Goal[]
}