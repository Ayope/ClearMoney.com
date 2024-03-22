import { User } from "./user.entity"
import SavingFrequency from "@/core/enums/savingFrequency.enum"

export class Goal {
    name : string
    description : string
    targeted_amount : number
    current_amount : number
    saving_amount : number
    saving_frequency : SavingFrequency
    starting_date : Date
    targeted_date : Date
    user : User
}