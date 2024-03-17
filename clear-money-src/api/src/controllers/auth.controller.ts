import { CreateUserDto } from "@/core/dtos";
import { LoginDto } from "@/core/dtos/requestDtos/login.dto";
import { ResponseUserDto } from "@/core/dtos/";
import { AuthFactoryService } from "@/use-cases/auth/auth-factory.service";
import { AuthUseCases } from "@/use-cases/auth/auth.use-case";
import { UserFactoryService } from "@/use-cases/user/user-factory.service";
import { UserUseCases } from "@/use-cases/user/user.use-case";
import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BadRequestException } from "@nestjs/common";
import { bcrypt } from "bcrypt"

@ApiTags('Authentication')
@Controller('api/auth')
export class AuthController{

    private responseUser: ResponseUserDto;

    constructor(
        private authUseCases : AuthUseCases,
        private userUseCases : UserUseCases,
        private authFactoryService : AuthFactoryService,
        private userFactoryService : UserFactoryService,
    ){
        this.responseUser = new ResponseUserDto();
    }

    private createResponseUser(user : any): ResponseUserDto {
        return {
          success: true,
          tokens: user.tokens,
          responseUser: {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
          }
        };
    }    

    @Post('signup')
    @ApiOperation({ summary: 'Create a new user account' })
    @ApiBody({ type: CreateUserDto })
    @ApiResponse({ status: 200, type: ResponseUserDto, description: 'User created successfully' })
    @ApiResponse({ status: 400, description: 'Bad request validation error' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    async signup(@Body() userDto : CreateUserDto) : Promise<ResponseUserDto> {
        const user = this.userFactoryService.createNewUser(userDto);
        
        if (await this.userUseCases.getByEmail(user.email)) {
            throw new BadRequestException('Email is already in use');
        }
        
        const authenticatedUser = await this.authUseCases.signup(user.email, user.password);
        
        user.authServiceID = authenticatedUser.user.uid;
        user.password = bcrypt.hash(user.password, 10);

        const createdUser = await this.userUseCases.createUser(user);

        return this.createResponseUser({
            id: createdUser['id'],
            first_name: createdUser.first_name,
            last_name: createdUser.last_name,
            email: createdUser.email,
            tokens: authenticatedUser.user.stsTokenManager
        });
    }

    @Post('login')
    @ApiOperation({ summary: 'Log in to an existing user account' })
    @ApiBody({ type: LoginDto })
    @ApiResponse({ status: 200, type: ResponseUserDto, description: 'User logged in successfully' })
    @ApiResponse({ status: 400, description: 'Bad request validation error' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    async login(@Body() loginDto : LoginDto) : Promise<ResponseUserDto> { 
        
        const user = this.authFactoryService.createLoginCredentials(loginDto);
        const loggedUser = await this.authUseCases.login(user.email, user.password);
        const dbUser = await this.userUseCases.getByAuthServiceID(loggedUser.user.uid);

        return this.createResponseUser({
            id: dbUser['id'],
            first_name: dbUser.first_name,
            last_name: dbUser.last_name,
            email: dbUser.email,
            tokens: loggedUser.user.stsTokenManager
        });
    }
}