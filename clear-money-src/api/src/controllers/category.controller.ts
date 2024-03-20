import { Category } from "@/core";
import { CreateCategoryDto, UpdateCategoryDto } from "@/core/dtos";
import { ResponseCategoryDto } from "@/core/dtos/responseDtos/ResposneCategory.dto";
import { CategoryFactoryService } from "@/use-cases/category/category-factory.service";
import { CategoryUseCases } from "@/use-cases/category/category.use-case";
import { UserUseCases } from "@/use-cases/user/user.use-case";
import { Controller, Post, Get, Body, BadRequestException, Param, Delete, Put, NotFoundException } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';
@ApiTags('Category')
@Controller('api/category')
export class CategoryController{
    
    private responseCategory : ResponseCategoryDto;

    constructor(
        private CategoryUseCases : CategoryUseCases,
        private CategoryFactoryService : CategoryFactoryService,
        private UserUseCases : UserUseCases
    ){
        this.responseCategory = new ResponseCategoryDto();
    }

    private createResponseCategory(category : any): ResponseCategoryDto {
        if(category === null) {
            throw new NotFoundException('Category not found');
        }

        return {
            id : category.id,
            name: category.name,
            user: {
                id: category.user.id,
                first_name: category.user.first_name,
                last_name: category.user.last_name,
                email: category.user.email,
            },
        };
    }
    
    private async checkIfCategoryExist(category : Category, ignoreId ?: string) {

        const existingCategory = await this.CategoryUseCases.getByName(category.name);
        
        if (existingCategory && existingCategory['id'] !== ignoreId) {
            throw new BadRequestException('Category already exist');
        }
    }

    private async checkIfUserExist(CategoryDto : CreateCategoryDto | UpdateCategoryDto) {       
        if(await this.UserUseCases.getUser(CategoryDto.user_id) === null){
            throw new NotFoundException('User not found'); 
        }
    }

    @Post()
    @ApiOperation({ summary: 'Create a new category' })
    @ApiBody({ type: CreateCategoryDto })
    @ApiResponse({ status: 201, description: 'The category has been successfully created.', type: ResponseCategoryDto })
    @ApiResponse({ status: 400, description: 'Category already exists.' })
    async createCategory(@Body() categoryDto : CreateCategoryDto) : Promise<ResponseCategoryDto> {
        
        const category = this.CategoryFactoryService.createNewCategory(categoryDto);
        
        await this.checkIfCategoryExist(category);
        
        await this.checkIfUserExist(categoryDto);
        
        const createdCategory = await this.CategoryUseCases.createCategory(category);
        
        return this.createResponseCategory(createdCategory);
    }

    @Get('user/:user_id')
    @ApiOperation({ summary: 'Get all categories' })
    @ApiResponse({ status: 200, description: 'Returns all categories.', type: [ResponseCategoryDto] })
    async getAllCategories(@Param('user_id') userId : string) : Promise<ResponseCategoryDto[]> {
        const categories = await this.CategoryUseCases.getCategoriesByUserId(userId);
        return categories.map(category => this.createResponseCategory(category));
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a category by ID' })
    @ApiParam({ name: 'id', description: 'ID of the category' })
    @ApiResponse({ status: 200, description: 'Returns the category with the specified ID.', type: ResponseCategoryDto })
    @ApiResponse({ status: 404, description: 'Category not found.' })
    async getCategory(@Param('id') id: string) : Promise<ResponseCategoryDto> {
        const category = await this.CategoryUseCases.getCategory(id);
        return this.createResponseCategory(category);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a category by ID' })
    @ApiParam({ name: 'id', description: 'ID of the category' })
    @ApiBody({ type: CreateCategoryDto })
    @ApiResponse({ status: 200, description: 'The category has been successfully updated.', type: ResponseCategoryDto })
    @ApiResponse({ status: 404, description: 'Category not found.' })
    async updateCategory(@Param('id') id: string, @Body() categoryDto: UpdateCategoryDto): Promise<ResponseCategoryDto> {
        
        const category = this.CategoryFactoryService.createUpdatedCategory(categoryDto);
        
        await this.checkIfCategoryExist(category, id);
        
        await this.checkIfUserExist(categoryDto)
        
        const updatedCategory = await this.CategoryUseCases.updateCategory(id, category);
        
        return this.createResponseCategory(updatedCategory);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a category by ID' })
    @ApiParam({ name: 'id', description: 'ID of the category' })
    @ApiResponse({ status: 200, description: 'The category has been successfully deleted.', type: ResponseCategoryDto })
    @ApiResponse({ status: 404, description: 'Category not found.' })
    async deleteCategory(@Param('id') id: string) : Promise<ResponseCategoryDto> {
        const category = await this.CategoryUseCases.deleteCategory(id);
        return this.createResponseCategory(category);
    }
}