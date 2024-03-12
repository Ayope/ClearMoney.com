import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from "@/controllers/";
import { AuthUseCases } from "@/use-cases/auth/auth.use-case";
import { UserUseCases } from "@/use-cases/user/user.use-case";
import { AuthFactoryService } from "@/use-cases/auth/auth-factory.service";
import { UserFactoryService } from "@/use-cases/user/user-factory.service";
import { CreateUserDto } from "@/core/dtos";
import { AllExceptionsFilter } from '@/frameworks/error-handling/filters/AllExceptionsFilter';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '@/app.module';
import * as request from 'supertest';
import { LoginDto } from '@/core/dtos/requestDtos/login.dto';

describe('Authentication (login and signup) tests', () => {
    let authController: AuthController;
    let mockAuthUseCases: AuthUseCases;
    let mockUserUseCases: UserUseCases;
    let mockAuthFactoryService: AuthFactoryService;
    let mockUserFactoryService: UserFactoryService;
    let app: INestApplication;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthUseCases,
                    useValue: {
                        signup: jest.fn(),
                    },
                },
                {
                    provide: UserUseCases,
                    useValue: {
                        createUser: jest.fn(),
                    },
                },
                {
                    provide: AuthFactoryService,
                    useValue: {},
                },
                {
                    provide: UserFactoryService,
                    useValue: {
                        createNewUser: jest.fn(),
                    },
                },
                
            ],
        }).compile();

        authController = module.get<AuthController>(AuthController);
        mockAuthUseCases = module.get<AuthUseCases>(AuthUseCases);
        mockUserUseCases = module.get<UserUseCases>(UserUseCases);
        mockAuthFactoryService = module.get<AuthFactoryService>(AuthFactoryService);
        mockUserFactoryService = module.get<UserFactoryService>(UserFactoryService);
    
        app = module.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        app.useGlobalFilters(new AllExceptionsFilter());
        await app.init();
    });

    describe('signup', () => {
        it('should register and create a new user and return responseUserDto', async () => {
            const userDto: CreateUserDto = {
                first_name: "John",
                last_name: "Doe",
                email: "john@example.com",
                password: "John@1234"
            };
            const createdUser = {
                id: 'mockId',
                first_name: 'John',
                last_name: 'Doe',
                email: 'john@example.com',
            };
            const authenticatedUser = {
                user: {
                    uid: 'mockUid',
                    stsTokenManager: 'mockToken',
                },
            };

            mockUserFactoryService.createNewUser = jest.fn().mockReturnValue(createdUser);
            mockAuthUseCases.signup = jest.fn().mockResolvedValue(authenticatedUser);
            mockUserUseCases.createUser = jest.fn().mockResolvedValue(createdUser);

            const result = await authController.signup(userDto);

            expect(result.success).toBe(true);
            expect(result.tokens).toBe(authenticatedUser.user.stsTokenManager);
            expect(result.responseUser).toEqual({
                id: createdUser.id,
                first_name: createdUser.first_name,
                last_name: createdUser.last_name,
                email: createdUser.email,
            });
        });

        it('should not register return status 400 error of email should not be empty', async () => {
            const response = await request(app.getHttpServer())
                .post('/api/auth/signup')
                .send({
                    first_name: 'Test',
                    last_name: 'User',
                    email: '',
                    password: 'test@Password1234',
                });
        
            expect(response.status).toBe(400);
            expect(response.body).toEqual(
                {
                    "timestamp": expect.any(String),
                    "statusCode": 400,
                    "message": [
                        "email should not be empty",
                        "email must be an email"
                    ],
                    "success": false,
                    "data": "Validation failed"
                }
            );
        });
    });

    describe('login', () => {
        it('should logged in return a response on the format of responseUserDto', async () => {
            const loginDto: LoginDto = {
                email: "john@example.com",
                password: "John@1234"
            };
            const loggedUser = {
                user: {
                    uid: 'mockUid',
                    stsTokenManager: 'mockToken',
                },
            };
            const dbUser = {
                id: 'mockId',
                first_name: 'John',
                last_name: 'Doe',
                email: 'john@example.com',
            };

            mockAuthFactoryService.createLoginCredentials = jest.fn().mockReturnValue(loginDto);
            mockAuthUseCases.login = jest.fn().mockResolvedValue(loggedUser);
            mockUserUseCases.getByAuthServiceID = jest.fn().mockResolvedValue(dbUser);

            const result = await authController.login(loginDto);

            expect(result.success).toBe(true);
            expect(result.tokens).toBe(loggedUser.user.stsTokenManager);
            expect(result.responseUser).toEqual({
                id: dbUser.id,
                first_name: dbUser.first_name,
                last_name: dbUser.last_name,
                email: dbUser.email,
            });
        });

        it('should not logged in and return status 400 error of email should not be empty', async () => {
            const response = await request(app.getHttpServer())
                .post('/api/auth/login')
                .send({
                    email: '',
                    password: 'test@Password1234',
                });
        
            expect(response.status).toBe(400);
            expect(response.body).toEqual(
                {
                    "timestamp": expect.any(String),
                    "statusCode": 400,
                    "message": [
                        "email should not be empty",
                        "email must be an email"
                    ],
                    "success": false,
                    "data": "Validation failed"
                }
            );
        });
    });

    afterAll(async () => {
        await app.close();
    });

});
