import { Category, IDataServices } from "@/core";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CategoryUseCases{
    constructor(
        private dataServices : IDataServices,
    ){}

    createCategory(category : Category){
        return this.dataServices.Categories.create(category);
    }

    getByName(name : string){
        return this.dataServices.Categories.getOneBySpecificColumn('name', name);
    }

    getAllCategories(){
        return this.dataServices.Categories.getAll();
    }

    getCategory(id : string){
        return this.dataServices.Categories.get(id);
    }

    updateCategory(id : string, category : Category){
        return this.dataServices.Categories.update(id, category);
    }

    deleteCategory(id : string){
        return this.dataServices.Categories.delete(id);
    }

    deleteAllCategories(){
        return this.dataServices.Categories.deleteAll();
    }
}