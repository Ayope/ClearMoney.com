import { DailyExpense, IDataServices } from "@/core";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DailyExpenseUseCases{
    constructor(
        private dataServices : IDataServices,
    ){}

    createDailyExpense(dailyExpense : DailyExpense){
        return this.dataServices.DailyExpenses.create(dailyExpense);
    }

    getByName(name : string){
        return this.dataServices.DailyExpenses.getOneBySpecificColumn('name', name);
    }

    getAllDailyExpenses(){
        return this.dataServices.DailyExpenses.getAll();
    }

    getDailyExpense(id : string){
        return this.dataServices.DailyExpenses.get(id);
    }

    updateDailyExpense(id : string, dailyExpense : DailyExpense){
        return this.dataServices.DailyExpenses.update(id, dailyExpense);
    }

    deleteDailyExpense(id : string){
        return this.dataServices.DailyExpenses.delete(id);
    }
}