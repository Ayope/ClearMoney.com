import { IDataServices } from "@/core";
import { IAuthRepository } from "@/core/abstracts/auth-services/auth-repository.abstract";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserUseCases{
    constructor(
        private dataServices : IDataServices,
        private authService : IAuthRepository
    ){}

    
}