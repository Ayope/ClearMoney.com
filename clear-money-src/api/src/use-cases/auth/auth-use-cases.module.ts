import { AuthServicesModule, DataServicesModule } from "@/services";
import { Module } from "@nestjs/common";
import { AuthFactoryService } from "./auth-factory.service";
import { AuthUseCases } from "./auth.use-case";

@Module({
    imports: [AuthServicesModule],
    providers : [AuthFactoryService, AuthUseCases],
    exports : [AuthFactoryService, AuthUseCases]
})
export class AuthUseCasesModule{}