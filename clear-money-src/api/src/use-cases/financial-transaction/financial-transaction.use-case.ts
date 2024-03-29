import { FinancialTransaction, IDataServices } from "@/core";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FinancialTransactionUseCases{
    constructor(
        private dataServices : IDataServices,
    ){}

    createFinancialTransaction(financialTransaction : FinancialTransaction){
        return this.dataServices.FinancialTransactions.create(financialTransaction);
    }

    getByName(name : string){
        return this.dataServices.FinancialTransactions.getOneBySpecificColumn('name', name);
    }

    getAllFinancialTransactions(){
        return this.dataServices.FinancialTransactions.getAll();
    }

    getAllFinancialTransactionsByCategory(category : string){
        return this.dataServices.FinancialTransactions.getAllBySpecificColumn('category', category);
    }

    getFinancialTransaction(id : string){
        return this.dataServices.FinancialTransactions.get(id);
    }

    getFinancialTransactionsByUserId(userId : string){
        return this.dataServices.FinancialTransactions.getAllBySpecificColumn('user', userId);
    }

    updateFinancialTransaction(id : string, FinancialTransaction : FinancialTransaction){
        return this.dataServices.FinancialTransactions.update(id, FinancialTransaction);
    }

    deleteFinancialTransaction(id : string){
        return this.dataServices.FinancialTransactions.delete(id);
    }

    deleteAllFinancialTransactions(){
        return this.dataServices.FinancialTransactions.deleteAll();
    }
}