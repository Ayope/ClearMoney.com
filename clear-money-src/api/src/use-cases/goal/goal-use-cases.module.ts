import { Module } from '@nestjs/common';
import { DataServicesModule } from "@/services";
import { GoalFactoryService } from './goal-factory.service';
import { GoalUseCases } from './goal.use-case';

@Module({
    imports: [DataServicesModule],
    providers: [GoalFactoryService, GoalUseCases],
    exports: [GoalFactoryService, GoalUseCases]
})
export class GoalModule {}