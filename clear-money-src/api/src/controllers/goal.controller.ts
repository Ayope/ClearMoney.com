import { Goal } from "@/core";
import { CreateGoalDto, UpdateGoalDto } from "@/core/dtos";
import { ResponseGoalDto } from "@/core/dtos/responseDtos/ResponseGoal.dto";
import { GoalFactoryService } from "@/use-cases/goal/goal-factory.service";
import { GoalUseCases } from "@/use-cases/goal/goal.use-case";
import { Controller, Post, Get, Body, BadRequestException, Param, Delete, Put, NotFoundException } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';
import { UserUseCases } from '@/use-cases/user/user.use-case';

@ApiTags('Goal')
@Controller('api/goal')
export class GoalController{
    
    private responseGoal : ResponseGoalDto;

    constructor(
        private GoalUseCases : GoalUseCases,
        private GoalFactoryService : GoalFactoryService,
        private UserUseCases : UserUseCases
    ){
        this.responseGoal = new ResponseGoalDto();
    }

    private createResponseGoal(Goal : any): ResponseGoalDto {
        if(Goal === null) {
            throw new NotFoundException('Goal not found');
        }

        return {
            id : Goal.id,
            name: Goal.name,
            description: Goal.description,
            targeted_amount: Goal.targeted_amount,
            saving_frequency: Goal.saving_frequency,
            targeted_date: Goal.targeted_date,
            current_amount: Goal.current_amount,
            saving_amount: Goal.saving_amount,
            user: {
                id: Goal.user.id,
                first_name: Goal.user.first_name,
                last_name: Goal.user.last_name,
                email: Goal.user.email,
            },
        };
    }
    
    private async checkIfGoalExist(Goal : Goal, ignoreId?: string) {

        const existingGoal = await this.GoalUseCases.getByName(Goal.name);
        
        if (existingGoal && existingGoal['id'] !== ignoreId) {
            throw new BadRequestException('Goal already exist');
        }
    
    }

    private async checkIfUserExist(GoalDto : CreateGoalDto | UpdateGoalDto) {       
        if(await this.UserUseCases.getUser(GoalDto.user_id) === null){
            throw new NotFoundException('User not found'); 
        }
    }

    private calculateSavingsAmount(goal: Goal): number {
        const currentDate = new Date();
        const targetDate = goal.targeted_date;
        const remainingTime = (goal.saving_frequency === 'yearly') ? targetDate.getFullYear() - currentDate.getFullYear() + 1 : (targetDate.getFullYear() - currentDate.getFullYear()) * 12 + targetDate.getMonth() - currentDate.getMonth() + 1;
        if (remainingTime > 0) {
            return Math.round(goal.targeted_amount / remainingTime);
        } else {
            throw new BadRequestException('target date is in the past');
        }
    }
    
    @Post()
    @ApiOperation({ summary: 'Create a new Goal' })
    @ApiBody({ type: CreateGoalDto })
    @ApiResponse({ status: 201, description: 'The Goal has been successfully created.', type: ResponseGoalDto })
    @ApiResponse({ status: 400, description: 'Goal already exists.' })
    async createGoal(@Body() GoalDto : CreateGoalDto) : Promise<ResponseGoalDto> {
        
        const Goal = this.GoalFactoryService.createNewGoal(GoalDto);
        
        await this.checkIfGoalExist(Goal);

        await this.checkIfUserExist(GoalDto);
        
        Goal.saving_amount = this.calculateSavingsAmount(Goal);

        const createdGoal = await this.GoalUseCases.createGoal(Goal);
        
        return this.createResponseGoal(createdGoal);

    }

    @Get()
    @ApiOperation({ summary: 'Get all Goals' })
    @ApiResponse({ status: 200, description: 'Returns all Goals.', type: [ResponseGoalDto] })
    async getAllGoals() : Promise<ResponseGoalDto[]> {
        const Goals = await this.GoalUseCases.getAllGoals();
        return Goals.map(Goal => this.createResponseGoal(Goal));
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a Goal by ID' })
    @ApiParam({ name: 'id', description: 'ID of the Goal' })
    @ApiResponse({ status: 200, description: 'Returns the Goal with the specified ID.', type: ResponseGoalDto })
    @ApiResponse({ status: 404, description: 'Goal not found.' })
    async getGoal(@Param('id') id: string) : Promise<ResponseGoalDto> {
        const Goal = await this.GoalUseCases.getGoal(id);
        return this.createResponseGoal(Goal);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a Goal by ID' })
    @ApiParam({ name: 'id', description: 'ID of the Goal' })
    @ApiBody({ type: CreateGoalDto })
    @ApiResponse({ status: 200, description: 'The Goal has been successfully updated.', type: ResponseGoalDto })
    @ApiResponse({ status: 404, description: 'Goal not found.' })
    async updateGoal(@Param('id') id: string, @Body() GoalDto: UpdateGoalDto): Promise<ResponseGoalDto> {
        
        const Goal = this.GoalFactoryService.createUpdatedGoal(GoalDto);

        await this.checkIfGoalExist(Goal, id);
        
        await this.checkIfUserExist(GoalDto);

        Goal.saving_amount = this.calculateSavingsAmount(Goal);

        const updatedGoal = await this.GoalUseCases.updateGoal(id, Goal);
        
        return this.createResponseGoal(updatedGoal);

    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a Goal by ID' })
    @ApiParam({ name: 'id', description: 'ID of the Goal' })
    @ApiResponse({ status: 200, description: 'The Goal has been successfully deleted.', type: ResponseGoalDto })
    @ApiResponse({ status: 404, description: 'Goal not found.' })
    async deleteGoal(@Param('id') id: string) : Promise<ResponseGoalDto> {

        const Goal = await this.GoalUseCases.deleteGoal(id);
        
        return this.createResponseGoal(Goal);
    
    }
}