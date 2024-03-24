import { IDataServices, User } from "@/core";
import { IAuthRepository } from "@/core/abstracts/auth-services/auth-repository.abstract";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthUseCases{
    constructor(
        private authService : IAuthRepository
    ){}

    signup(email : string, password : string){
        return this.authService.signup(email, password);
    }

    login(email:string, password:string){
        return this.authService.login(email, password);
    }

    logout(){
        return this.authService.logout();
    }
}