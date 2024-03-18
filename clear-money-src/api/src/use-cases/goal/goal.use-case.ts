import { Goal, IDataServices } from "@/core";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GoalUseCases{
    constructor(
        private dataServices : IDataServices,
    ){}

    createGoal(goal : Goal){
        return this.dataServices.Goals.create(goal);
    }

    getByName(name : string){
        return this.dataServices.Goals.getOneBySpecificColumn('name', name);
    }

    getAllGoals(){
        return this.dataServices.Goals.getAll();
    }

    getGoalsByUserId(userId : string){
        return this.dataServices.Goals.getAllBySpecificColumn('user', userId);
    }

    getGoal(id : string){
        return this.dataServices.Goals.get(id);
    }

    updateGoal(id : string, goal : Goal){
        return this.dataServices.Goals.update(id, goal);
    }

    deleteGoal(id : string){
        return this.dataServices.Goals.delete(id);
    }

    deleteAllGoals(){
        return this.dataServices.Goals.deleteAll();
    }
}