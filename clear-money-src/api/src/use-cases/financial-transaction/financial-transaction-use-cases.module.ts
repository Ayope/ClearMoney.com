import { Module } from '@nestjs/common';
import { DataServicesModule } from "@/services";
import { FinancialTransactionFactoryService } from './financial-transaction-factory.service';
import { FinancialTransactionUseCases } from './financial-transaction.use-case';

@Module({
    imports: [DataServicesModule],
    providers: [FinancialTransactionFactoryService, FinancialTransactionUseCases],
    exports: [FinancialTransactionFactoryService, FinancialTransactionUseCases]
})
export class FinancialTransactionModule {}