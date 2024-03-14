import { FinancialTransaction } from "@/core";
import { CreateFinancialTransactionDto, UpdateFinancialTransactionDto } from "@/core/dtos";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FinancialTransactionFactoryService {
    createNewFinancialTransaction(CreateFinancialTransactionDto : CreateFinancialTransactionDto){
        
        const newFinancialTransaction = new FinancialTransaction();

        newFinancialTransaction.name = CreateFinancialTransactionDto.name;
        newFinancialTransaction.amount = CreateFinancialTransactionDto.amount;
        newFinancialTransaction.description = CreateFinancialTransactionDto.description;
        newFinancialTransaction.type = CreateFinancialTransactionDto.type;
        newFinancialTransaction.category = CreateFinancialTransactionDto.category_id;
        newFinancialTransaction.user = CreateFinancialTransactionDto.user_id;

        return newFinancialTransaction;
    }

    createUpdatedFinancialTransaction(UpdateFinancialTransactionDto : UpdateFinancialTransactionDto){
        
        const updatedFinancialTransaction = new FinancialTransaction();

        updatedFinancialTransaction.name = UpdateFinancialTransactionDto.name;
        updatedFinancialTransaction.amount = UpdateFinancialTransactionDto.amount;
        updatedFinancialTransaction.description = UpdateFinancialTransactionDto.description;
        updatedFinancialTransaction.type = UpdateFinancialTransactionDto.type;
        updatedFinancialTransaction.category = UpdateFinancialTransactionDto.category_id;
        updatedFinancialTransaction.user = UpdateFinancialTransactionDto.user_id;

        return updatedFinancialTransaction;
    }

}