import { UpdateCategoryDto } from './../../core/dtos/requestDtos/category.dto';
import { Category } from "@/core";
import { CreateCategoryDto } from "@/core/dtos";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CategoryFactoryService {
    createNewCategory(CreateCategoryDto : CreateCategoryDto){
        const newCategory = new Category();
        newCategory.name = CreateCategoryDto.name;
        newCategory.user = CreateCategoryDto.user_id;

        return newCategory;
    }

    createUpdatedCategory(UpdateCategoryDto : UpdateCategoryDto){
        const updatedCategory = new Category();
        updatedCategory.name = UpdateCategoryDto.name;
        updatedCategory.user = UpdateCategoryDto.user_id;

        return updatedCategory;
    }
}