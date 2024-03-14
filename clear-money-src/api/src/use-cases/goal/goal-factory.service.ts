import { Goal } from "@/core";
import { CreateGoalDto, UpdateGoalDto } from "@/core/dtos";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GoalFactoryService {
    createNewGoal(CreateGoalDto : CreateGoalDto){
        
        const newGoal = new Goal();

        newGoal.name = CreateGoalDto.name;
        newGoal.description = CreateGoalDto.description;
        newGoal.targeted_amount = CreateGoalDto.targeted_amount;
        newGoal.saving_frequency = CreateGoalDto.saving_frequency;
        newGoal.targeted_date = CreateGoalDto.targeted_date;
        newGoal.user = CreateGoalDto.user_id;

        return newGoal;
    }

    createUpdatedGoal(UpdateGoalDto : UpdateGoalDto){
        
        const updatedGoal = new Goal();

        updatedGoal.name = UpdateGoalDto.name;
        updatedGoal.description = UpdateGoalDto.description;
        updatedGoal.targeted_amount = UpdateGoalDto.targeted_amount;
        updatedGoal.saving_frequency = UpdateGoalDto.saving_frequency;
        updatedGoal.targeted_date = UpdateGoalDto.targeted_date;
        updatedGoal.user = UpdateGoalDto.user_id;

        return updatedGoal;
    }

}