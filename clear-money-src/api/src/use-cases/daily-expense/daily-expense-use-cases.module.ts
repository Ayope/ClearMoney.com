import { Module } from '@nestjs/common';
import { DataServicesModule } from "@/services";
import { DailyExpenseFactoryService } from './daily-expense-factory.service';
import { DailyExpenseUseCases } from './daily-expense.use-case';

@Module({
    imports: [DataServicesModule],
    providers: [DailyExpenseFactoryService, DailyExpenseUseCases],
    exports: [DailyExpenseFactoryService, DailyExpenseUseCases]
})
export class DailyExpenseModule {}