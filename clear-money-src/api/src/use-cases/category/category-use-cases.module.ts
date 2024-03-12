import { DataServicesModule } from "@/services";
import { Module } from "@nestjs/common";
import { CategoryFactoryService } from './category-factory.service';
import { CategoryUseCases } from "./category.use-case";

@Module({
    imports: [DataServicesModule],
    providers : [CategoryFactoryService, CategoryUseCases],
    exports : [CategoryFactoryService, CategoryUseCases]
})
export class CategoryUseCasesModule{}