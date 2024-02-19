import { Category } from "./category.entity";
import { User } from "./user.entity";

export class DailyExpense {
    name : string
    amount : number
    description : string
    date : Date
    category : Category
    user : User
}