import { Category } from "./category.entity"
import { User } from "./user.entity"
import FinancialType from "@/core/enums/financial-type.enum"

export class FinancialTransaction {
    name : string
    amount : number
    description : string
    type : FinancialType
    category : Category
    user : User
}