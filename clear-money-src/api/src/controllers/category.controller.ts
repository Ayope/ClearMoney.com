import { Category } from "@/core";
import { CreateCategoryDto } from "@/core/dtos";
import { ResponseCategoryDto } from "@/core/dtos/responseDtos/ResposneCategory.dto";
import { CategoryFactoryService } from "@/use-cases/category/category-factory.service";
import { CategoryUseCases } from "@/use-cases/category/category.use-case";
import { Controller, Post, Get, Body, BadRequestException, Param, Delete, Put, NotFoundException } from "@nestjs/common";

@Controller('api/category')
export class CategoryController{

    private responseCategory : ResponseCategoryDto;

    constructor(
        private CategoryUseCases : CategoryUseCases,
        private CategoryFactoryService : CategoryFactoryService
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
        };
    }
    
    private async checkIfCategoryExist(category : Category) {
        if (await this.CategoryUseCases.getByName(category.name)) {
            throw new BadRequestException('Category already exist');
        }
    }

    @Post()
    async createCategory(@Body() categoryDto : CreateCategoryDto) : Promise<ResponseCategoryDto> {
        const category = this.CategoryFactoryService.createNewCategory(categoryDto);
        await this.checkIfCategoryExist(category);
        const createdCategory = await this.CategoryUseCases.createCategory(category);
        return this.createResponseCategory({
            id: createdCategory['id'],
            name: createdCategory.name,
        });
    }

    @Get()
    async getAllCategories() : Promise<ResponseCategoryDto[]> {
        const categories = await this.CategoryUseCases.getAllCategories();
        return categories.map(category => this.createResponseCategory(category));
    }

    @Get(':id')
    async getCategory(@Param('id') id: string) : Promise<ResponseCategoryDto> {
        const category = await this.CategoryUseCases.getCategory(id);
        console.log(category);
        return this.createResponseCategory(category);
    }

    @Put(':id')
    async updateCategory(@Param('id') id: string, @Body() categoryDto: CreateCategoryDto): Promise<ResponseCategoryDto> {
        const category = this.CategoryFactoryService.createNewCategory(categoryDto);
        await this.checkIfCategoryExist(category);
        const updatedCategory = await this.CategoryUseCases.updateCategory(id, category);
        return this.createResponseCategory(updatedCategory);
    }

    @Delete(':id')
    async deleteCategory(@Param('id') id: string) : Promise<ResponseCategoryDto> {
        const category = await this.CategoryUseCases.deleteCategory(id);
        return this.createResponseCategory(category);
    }
}