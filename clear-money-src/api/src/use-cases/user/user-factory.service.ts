import { User } from "@/core";
import { CreateUserDto } from "@/core/dtos";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserFactoryService {
    createNewUser(createUserDto : CreateUserDto){
        const newUser = new User();
        newUser.first_name = createUserDto.first_name;
        newUser.last_name = createUserDto.last_name;
        newUser.email = createUserDto.email;
        newUser.password = createUserDto.password;

        return newUser;
    }
}