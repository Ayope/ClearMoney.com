import { Category } from "@/core";
import { CreateCategoryDto } from "@/core/dtos";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CategoryFactoryService {
    createNewCategory(CreateCategoryDto : CreateCategoryDto){
        const newCategory = new Category();
        newCategory.name = CreateCategoryDto.name;
        
        return newCategory;
    }
}