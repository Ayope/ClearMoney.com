import { IDataServices, User } from "@/core";
import { IAuthRepository } from "@/core/abstracts/auth-services/auth-repository.abstract";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserUseCases{
    constructor(
        private dataServices : IDataServices,
    ){}

    createUser(user : User){
        return this.dataServices.Users.create(user);
    }

    getByAuthServiceID(id : string){
        return this.dataServices.Users.getOneBySpecificColumn('authServiceID', id);
    }
}