import { CategoryUseCases } from '@/use-cases/category/category.use-case';
import { DailyExpense } from "@/core";
import { CreateDailyExpenseDto, UpdateDailyExpenseDto } from "@/core/dtos";
import { ResponseDailyExpenseDto } from "@/core/dtos/responseDtos/ResponseDailyExpense.dto";
import { DailyExpenseFactoryService } from "@/use-cases/daily-expense/daily-expense-factory.service";
import { DailyExpenseUseCases } from "@/use-cases/daily-expense/daily-expense.use-case";
import { Controller, Post, Get, Body, BadRequestException, Param, Delete, Put, NotFoundException } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';
import { UserUseCases } from '@/use-cases/user/user.use-case';

@ApiTags('Daily Expense')
@Controller('api/dailyExpense')
export class DailyExpenseController{
    
    private responseDailyExpense : ResponseDailyExpenseDto;

    constructor(
        private DailyExpenseUseCases : DailyExpenseUseCases,
        private DailyExpenseFactoryService : DailyExpenseFactoryService,
        private CategoryUseCases : CategoryUseCases,
        private UserUseCases : UserUseCases
    ){
        this.responseDailyExpense = new ResponseDailyExpenseDto();
    }

    private createResponseDailyExpense(DailyExpense : any): ResponseDailyExpenseDto {
        if(DailyExpense === null) {
            throw new NotFoundException('DailyExpense not found');
        }

        return {
            id : DailyExpense.id,
            name: DailyExpense.name,
            amount: DailyExpense.amount,
            description: DailyExpense.description,
            date : DailyExpense.date,
            category: {
                id: DailyExpense.category?._id,
                name: DailyExpense.category?.name,
                user: {
                    id: DailyExpense.user.id,
                    first_name: DailyExpense.user.first_name,
                    last_name: DailyExpense.user.last_name,
                    email: DailyExpense.user.email,
                }
            },
            user: {
                id: DailyExpense.user.id,
                first_name: DailyExpense.user.first_name,
                last_name: DailyExpense.user.last_name,
                email: DailyExpense.user.email,
            },
        };
    }
    
    private async checkIfDailyExpenseExist(DailyExpense : DailyExpense, ignoreId ?: string) {

        const existingDailyExpense = await this.DailyExpenseUseCases.getByName(DailyExpense.name);
    
        if (existingDailyExpense && existingDailyExpense['id'] !== ignoreId) {
            throw new BadRequestException('Daily Expense already exist');
        }

    }

    private async checkIfCategoryAndUserLegit(DailyExpenseDto : CreateDailyExpenseDto | UpdateDailyExpenseDto) {
        if(
            DailyExpenseDto.category_id !== "" 
            && DailyExpenseDto.category_id !== undefined
            && DailyExpenseDto.category_id !== null
        ){
            if(await this.CategoryUseCases.getCategory(DailyExpenseDto.category_id) === null){
                throw new NotFoundException('Category not found');
            }
        }
        
        if(await this.UserUseCases.getUser(DailyExpenseDto.user_id) === null){
            throw new NotFoundException('User not found');
            //TODO check also if the user authenticated is the one that make this request by checking the id of the user who made the request with the id of the authenticated user 
        }
    }

    @Post()
    @ApiOperation({ summary: 'Create a new Daily Expense' })
    @ApiBody({ type: CreateDailyExpenseDto })
    @ApiResponse({ status: 201, description: 'The Daily Expense has been successfully created.', type: ResponseDailyExpenseDto })
    @ApiResponse({ status: 400, description: 'Daily Expense already exists.' })
    async createDailyExpense(@Body() DailyExpenseDto : CreateDailyExpenseDto) : Promise<ResponseDailyExpenseDto> {

        const DailyExpense = this.DailyExpenseFactoryService.createNewDailyExpense(DailyExpenseDto);
        
        await this.checkIfDailyExpenseExist(DailyExpense);

        await this.checkIfCategoryAndUserLegit(DailyExpenseDto);
        
        const createdDailyExpense = await this.DailyExpenseUseCases.createDailyExpense(DailyExpense);
        
        return this.createResponseDailyExpense(createdDailyExpense);

    }

    @Get()
    @ApiOperation({ summary: 'Get all daily expenses' })
    @ApiResponse({ status: 200, description: 'Returns all daily expenses.', type: [ResponseDailyExpenseDto] })
    async getAllDailyExpenses() : Promise<ResponseDailyExpenseDto[]> {
        const dailyExpenses = await this.DailyExpenseUseCases.getAllDailyExpenses();
        return dailyExpenses.map(DailyExpense => this.createResponseDailyExpense(DailyExpense));
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a Daily Expense by ID' })
    @ApiParam({ name: 'id', description: 'ID of the Daily Expense' })
    @ApiResponse({ status: 200, description: 'Returns the Daily Expense with the specified ID.', type: ResponseDailyExpenseDto })
    @ApiResponse({ status: 404, description: 'Daily Expense not found.' })
    async getDailyExpense(@Param('id') id: string) : Promise<ResponseDailyExpenseDto> {
        const DailyExpense = await this.DailyExpenseUseCases.getDailyExpense(id);
        return this.createResponseDailyExpense(DailyExpense);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a Daily Expense by ID' })
    @ApiParam({ name: 'id', description: 'ID of the Daily Expense' })
    @ApiBody({ type: CreateDailyExpenseDto })
    @ApiResponse({ status: 200, description: 'The Daily Expense has been successfully updated.', type: ResponseDailyExpenseDto })
    @ApiResponse({ status: 404, description: 'Daily Expense not found.' })
    async updateDailyExpense(@Param('id') id: string, @Body() DailyExpenseDto: UpdateDailyExpenseDto): Promise<ResponseDailyExpenseDto> {
        
        const DailyExpense = this.DailyExpenseFactoryService.createUpdatedDailyExpense(DailyExpenseDto);
                
        await this.checkIfDailyExpenseExist(DailyExpense, id);
        
        await this.checkIfCategoryAndUserLegit(DailyExpenseDto);

        const updatedDailyExpense = await this.DailyExpenseUseCases.updateDailyExpense(id, DailyExpense);
        
        return this.createResponseDailyExpense(updatedDailyExpense);

    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a Daily Expense by ID' })
    @ApiParam({ name: 'id', description: 'ID of the Daily Expense' })
    @ApiResponse({ status: 200, description: 'The Daily Expense has been successfully deleted.', type: ResponseDailyExpenseDto })
    @ApiResponse({ status: 404, description: 'Daily Expense not found.' })
    async deleteDailyExpense(@Param('id') id: string) : Promise<ResponseDailyExpenseDto> {

        const DailyExpense = await this.DailyExpenseUseCases.deleteDailyExpense(id);
        
        return this.createResponseDailyExpense(DailyExpense);
    
    }
}