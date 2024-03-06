import { User } from "@/core";
import { CreateUserDto } from "@/core/dtos";
import { LoginDto } from "@/core/dtos/requestDtos/login.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthFactoryService {
    createLoginCredentials(loginDto : LoginDto){
        const LoggedUser = new User();
        LoggedUser.email = loginDto.email;
        LoggedUser.password = loginDto.password;

        return LoggedUser;
    }
}