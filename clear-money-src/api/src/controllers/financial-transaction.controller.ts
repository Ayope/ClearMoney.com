import { CategoryUseCases } from '@/use-cases/category/category.use-case';
import { FinancialTransaction } from "@/core";
import { CreateFinancialTransactionDto, UpdateFinancialTransactionDto } from "@/core/dtos";
import { ResponseFinancialTransactionDto } from "@/core/dtos/responseDtos/ResponseFinancialTransaction.dto";
import { FinancialTransactionFactoryService } from "@/use-cases/financial-transaction/financial-transaction-factory.service";
import { FinancialTransactionUseCases } from "@/use-cases/financial-transaction/financial-transaction.use-case";
import { Controller, Post, Get, Body, BadRequestException, Param, Delete, Put, NotFoundException } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';
import { UserUseCases } from '@/use-cases/user/user.use-case';

@ApiTags('Financial Transaction')
@Controller('api/financialTransaction')
export class FinancialTransactionController{
    
    private responseFinancialTransaction : ResponseFinancialTransactionDto;

    constructor(
        private FinancialTransactionUseCases : FinancialTransactionUseCases,
        private FinancialTransactionFactoryService : FinancialTransactionFactoryService,
        private CategoryUseCases : CategoryUseCases,
        private UserUseCases : UserUseCases
    ){
        this.responseFinancialTransaction = new ResponseFinancialTransactionDto();
    }

    private createResponseFinancialTransaction(FinancialTransaction : any): ResponseFinancialTransactionDto {
        if(FinancialTransaction === null) {
            throw new NotFoundException('FinancialTransaction not found');
        }

        return {
            id : FinancialTransaction.id,
            name: FinancialTransaction.name,
            amount: FinancialTransaction.amount,
            description: FinancialTransaction.description,
            type: FinancialTransaction.type,
            category: {
                id: FinancialTransaction.category?._id,
                name: FinancialTransaction.category?.name,
                user: {
                    id: FinancialTransaction.user.id,
                    first_name: FinancialTransaction.user.first_name,
                    last_name: FinancialTransaction.user.last_name,
                    email: FinancialTransaction.user.email,
                }
            },
            user: {
                id: FinancialTransaction.user?.id,
                first_name: FinancialTransaction.user?.first_name,
                last_name: FinancialTransaction.user?.last_name,
                email: FinancialTransaction.user?.email,
            },
        };
    }
    
    private async checkIfFinancialTransactionExist(FinancialTransaction : FinancialTransaction, ignoreId ?: string) {

        const existingFinancialTransaction = await this.FinancialTransactionUseCases.getByName(FinancialTransaction.name);
        
        if (existingFinancialTransaction && existingFinancialTransaction['id'] !== ignoreId) {
            throw new BadRequestException('FinancialTransaction already exist');
        }
    }

    private async checkIfCategoryAndUserLegit(FinancialTransactionDto : CreateFinancialTransactionDto | UpdateFinancialTransactionDto) {
        if(
            FinancialTransactionDto.category_id !== "" 
            && FinancialTransactionDto.category_id !== undefined
            && FinancialTransactionDto.category_id !== null
        ){
            if(await this.CategoryUseCases.getCategory(FinancialTransactionDto.category_id) === null){
                throw new NotFoundException('Category not found');
            }
        }
        
        if(await this.UserUseCases.getUser(FinancialTransactionDto.user_id) === null){
            throw new NotFoundException('User not found');
        }
    }

    @Post()
    @ApiOperation({ summary: 'Create a new Financial Transaction' })
    @ApiBody({ type: CreateFinancialTransactionDto })
    @ApiResponse({ status: 201, description: 'The Financial Transaction has been successfully created.', type: ResponseFinancialTransactionDto })
    @ApiResponse({ status: 400, description: 'Financial Transaction already exists.' })
    async createFinancialTransaction(@Body() FinancialTransactionDto : CreateFinancialTransactionDto) : Promise<ResponseFinancialTransactionDto> {
        
        const FinancialTransaction = this.FinancialTransactionFactoryService.createNewFinancialTransaction(FinancialTransactionDto);
        
        await this.checkIfFinancialTransactionExist(FinancialTransaction);

        await this.checkIfCategoryAndUserLegit(FinancialTransactionDto);
        
        const createdFinancialTransaction = await this.FinancialTransactionUseCases.createFinancialTransaction(FinancialTransaction);
        
        return this.createResponseFinancialTransaction(createdFinancialTransaction);

    }

    @Get()
    @ApiOperation({ summary: 'Get all Financial Transactions' })
    @ApiResponse({ status: 200, description: 'Returns all Financial Transactions.', type: [ResponseFinancialTransactionDto] })
    async getAllFinancialTransactions() : Promise<ResponseFinancialTransactionDto[]> {
        const financialTransaction = await this.FinancialTransactionUseCases.getAllFinancialTransactions();
        return financialTransaction.map(financialTransaction => this.createResponseFinancialTransaction(financialTransaction));
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a Financial Transaction by ID' })
    @ApiParam({ name: 'id', description: 'ID of the Financial Transaction' })
    @ApiResponse({ status: 200, description: 'Returns the Financial Transaction with the specified ID.', type: ResponseFinancialTransactionDto })
    @ApiResponse({ status: 404, description: 'Financial Transaction not found.' })
    async getFinancialTransaction(@Param('id') id: string) : Promise<ResponseFinancialTransactionDto> {
        const FinancialTransaction = await this.FinancialTransactionUseCases.getFinancialTransaction(id);
        return this.createResponseFinancialTransaction(FinancialTransaction);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a Financial Transaction by ID' })
    @ApiParam({ name: 'id', description: 'ID of the Financial Transaction' })
    @ApiBody({ type: CreateFinancialTransactionDto })
    @ApiResponse({ status: 200, description: 'The Financial Transaction has been successfully updated.', type: ResponseFinancialTransactionDto })
    @ApiResponse({ status: 404, description: 'Financial Transaction not found.' })
    async updateFinancialTransaction(@Param('id') id: string, @Body() FinancialTransactionDto: UpdateFinancialTransactionDto): Promise<ResponseFinancialTransactionDto> {
        
        const FinancialTransaction = this.FinancialTransactionFactoryService.createUpdatedFinancialTransaction(FinancialTransactionDto);
                
        await this.checkIfFinancialTransactionExist(FinancialTransaction, id);
        
        await this.checkIfCategoryAndUserLegit(FinancialTransactionDto);

        const updatedFinancialTransaction = await this.FinancialTransactionUseCases.updateFinancialTransaction(id, FinancialTransaction);
        
        return this.createResponseFinancialTransaction(updatedFinancialTransaction);

    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a Financial Transaction by ID' })
    @ApiParam({ name: 'id', description: 'ID of the Financial Transaction' })
    @ApiResponse({ status: 200, description: 'The Financial Transaction has been successfully deleted.', type: ResponseFinancialTransactionDto })
    @ApiResponse({ status: 404, description: 'Financial Transaction not found.' })
    async deleteFinancialTransaction(@Param('id') id: string) : Promise<ResponseFinancialTransactionDto> {

        const FinancialTransaction = await this.FinancialTransactionUseCases.deleteFinancialTransaction(id);
        
        return this.createResponseFinancialTransaction(FinancialTransaction);
    
    }
}