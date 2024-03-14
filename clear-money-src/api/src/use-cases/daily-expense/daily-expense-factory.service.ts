import { DailyExpense } from "@/core";
import { CreateDailyExpenseDto, UpdateDailyExpenseDto } from "@/core/dtos";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DailyExpenseFactoryService {
    createNewDailyExpense(CreateDailyExpenseDto : CreateDailyExpenseDto){
        
        const newDailyExpense = new DailyExpense();

        newDailyExpense.name = CreateDailyExpenseDto.name;
        newDailyExpense.amount = CreateDailyExpenseDto.amount;
        newDailyExpense.description = CreateDailyExpenseDto.description;
        newDailyExpense.date = new Date(CreateDailyExpenseDto.date);
        newDailyExpense.category = CreateDailyExpenseDto.category_id;
        newDailyExpense.user = CreateDailyExpenseDto.user_id;

        return newDailyExpense;
    }

    createUpdatedDailyExpense(UpdateDailyExpenseDto : UpdateDailyExpenseDto){
        
        const updatedDailyExpense = new DailyExpense();

        updatedDailyExpense.name = UpdateDailyExpenseDto.name;
        updatedDailyExpense.amount = UpdateDailyExpenseDto.amount;
        updatedDailyExpense.description = UpdateDailyExpenseDto.description;
        updatedDailyExpense.date = new Date(UpdateDailyExpenseDto.date);
        updatedDailyExpense.category = UpdateDailyExpenseDto.category_id;
        updatedDailyExpense.user = UpdateDailyExpenseDto.user_id;

        return updatedDailyExpense;
    }

}