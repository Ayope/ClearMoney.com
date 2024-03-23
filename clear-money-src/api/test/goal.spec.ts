import { AppModule } from "@/app.module";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { AllExceptionsFilter } from "@/error-handling/filters/AllExceptionsFilter";
import { Test, TestingModule } from "@nestjs/testing";
import { CreateGoalDto } from "@/core/dtos";
import { UserUseCases } from "@/use-cases/user/user.use-case";
import { GoalController } from "@/controllers/goal.controller";
import { GoalUseCases } from "@/use-cases/goal/goal.use-case";
import { GoalFactoryService } from "@/use-cases/goal/goal-factory.service";
import * as request from 'supertest';
import SavingFrequency from "@/core/enums/savingFrequency.enum";


describe('FinancialTransactionController', () => {
    let goalController: GoalController;
    let mockGoalUseCases: GoalUseCases;
    let mockGoalFactoryService: GoalFactoryService;
    let mockUserUseCases: UserUseCases;
    let app: INestApplication;
    let date : Date;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
            controllers: [GoalController],
            providers: [
                {
                    provide: GoalUseCases,
                    useValue: {
                        createGoal: jest.fn(),
                    },
                },
                {
                    provide: GoalFactoryService,
                    useValue: {
                        createNewGoal: jest.fn(),
                    },
                },
                {
                    provide: UserUseCases,
                    useValue: {
                        getUser: jest.fn(),
                    },
                }
            ],
        }).compile();

        goalController = module.get<GoalController>(GoalController);
        mockGoalUseCases = module.get<GoalUseCases>(GoalUseCases);
        mockGoalFactoryService = module.get<GoalFactoryService>(GoalFactoryService);
        mockUserUseCases = module.get<UserUseCases>(UserUseCases);

        date = new Date("2025-03-14T00:00:00.000Z");

        app = module.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        app.useGlobalFilters(new AllExceptionsFilter());
        await app.init();
    });

    it('should create a financial transaction successfully', async () => {

        const GoalDto : CreateGoalDto = {
            name: 'Test Goal',
            description: 'Test Description',
            targeted_amount: 15000,
            saving_frequency: SavingFrequency.Yearly,
            targeted_date: date,
            starting_date: new Date(date.getTime() - 1000 * 60 * 60 * 24),
            user_id: "mockUserId",
        };

        const Goal = {
            name: 'Test Goal',
            description: 'Test Description',
            targeted_amount: 15000,
            saving_frequency: SavingFrequency.Yearly,
            targeted_date: date,
            starting_date: new Date(date.getTime() - 1000 * 60 * 60 * 24),
            user: "mockUserId",
        };

        const createdGoal = {
            id: 'mockId',
            name: 'Test Goal',	
            description: 'Test Description',
            targeted_amount: 15000,
            saving_frequency: 'yearly',
            targeted_date: date,
            starting_date: new Date("2024-03-23T15:05:12.561Z"),
            current_amount: 0,
            saving_amount: 7500,
            user: {
                id: "mockUserId",
                first_name: "mockFirstName",
                last_name: "mockLastName",
                email: "mockEmail@email.com",
                password : "mockPassword",
                authServiceId : "mockAuthServiceId",
            }
        }

        mockGoalFactoryService.createNewGoal = jest.fn().mockReturnValue(Goal);
        mockUserUseCases.getUser = jest.fn().mockResolvedValue({
            id: "mockUserId",
            first_name: "mockFirstName",
            last_name: "mockLastName",
            email: "mockEmail@email.com",
            password : "mockPassword",
            authServiceId : "mockAuthServiceId",
        });
        mockGoalUseCases.createGoal = jest.fn().mockResolvedValue(createdGoal);
        
        const response = await goalController.createGoal(GoalDto);
        
        expect(response).toEqual({
            id: 'mockId',
            name: 'Test Goal',	
            description: 'Test Description',
            targeted_amount: 15000,
            saving_frequency: 'yearly',
            targeted_date: date,
            starting_date: new Date("2024-03-23T15:05:12.561Z"),
            current_amount: 0,
            saving_amount: 7500,
            user: {
                id: "mockUserId",
                first_name: 'mockFirstName',
                last_name: 'mockLastName',
                email: 'mockEmail@email.com',
            }
        });
    });

    it('should error 400 when the name of the goal is not provided on the body of the request', async () => {

        const response = await request(app.getHttpServer())
          .post('/api/goal')
          .send({
            "name": "",
            "description": "Save money for the new year",
            "targeted_amount": 15000,
            "saving_frequency": "yearly",
            "targeted_date": "2025-03-14T00:00:00.000Z",
            "starting_date": "2024-03-13T00:00:00.000Z",
            "user_id": "65f03bfae0ba1bd41d347b69"
            });
    
        expect(response.status).toBe(400);
        expect(response.body).toEqual(
            {
                "timestamp": expect.any(String),
                "statusCode": 400,
                "message": [
                    "name should not be empty"
                ],
                "success": false,
                "data": "Validation failed"
            });
    });

    afterAll(async () => {
        await app.close();
    })
});