import { UpdateCategoryDto } from './../../core/dtos/requestDtos/category.dto';
import { Category } from "@/core";
import { CreateCategoryDto } from "@/core/dtos";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CategoryFactoryService {
    createNewCategory(CreateCategoryDto : CreateCategoryDto){
        const newCategory = new Category();
        newCategory.name = CreateCategoryDto.name;
        newCategory.color = CreateCategoryDto.color === "" ? "#" + Math.floor(Math.random()*16777215).toString(16) : CreateCategoryDto.color;
        newCategory.user = CreateCategoryDto.user_id;

        return newCategory;
    }

    createUpdatedCategory(UpdateCategoryDto : UpdateCategoryDto){
        const updatedCategory = new Category();
        updatedCategory.name = UpdateCategoryDto.name;
        updatedCategory.color = UpdateCategoryDto.color === "" ? "#" + Math.floor(Math.random()*16777215).toString(16) : UpdateCategoryDto.color;
        updatedCategory.user = UpdateCategoryDto.user_id;

        return updatedCategory;
    }
}