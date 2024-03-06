import { User } from "@/core";
import { CreateUserDto } from "@/core/dtos";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserFactoryService {
    createNewUser(CreateUserDto : CreateUserDto){
        const newUser = new User();
        newUser.first_name = CreateUserDto.first_name;
        newUser.last_name = CreateUserDto.last_name;
        newUser.email = CreateUserDto.email;
        newUser.password = CreateUserDto.password;

        return newUser;
    }
}