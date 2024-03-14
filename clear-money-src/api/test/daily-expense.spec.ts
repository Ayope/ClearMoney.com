import { AppModule } from "@/app.module";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { AllExceptionsFilter } from "@/frameworks/error-handling/filters/AllExceptionsFilter";
import { Test, TestingModule } from "@nestjs/testing";
import FinancialType from "@/core/enums/financial-type.enum";
import { CreateDailyExpenseDto, CreateFinancialTransactionDto } from "@/core/dtos";
import { CategoryUseCases } from "@/use-cases/category/category.use-case";
import { UserUseCases } from "@/use-cases/user/user.use-case";
import * as request from 'supertest';
import { DailyExpenseController } from "@/controllers/daily-expense.controller";
import { DailyExpenseUseCases } from "@/use-cases/daily-expense/daily-expense.use-case";
import { DailyExpenseFactoryService } from "@/use-cases/daily-expense/daily-expense-factory.service";


describe('FinancialTransactionController', () => {
    let dailyExpenseController: DailyExpenseController;
    let mockDailyExpenseUseCases: DailyExpenseUseCases;
    let mockDailyExpenseFactoryService: DailyExpenseFactoryService;
    let mockCategoryUseCases: CategoryUseCases;
    let mockUserUseCases: UserUseCases;
    let app: INestApplication;
    let date : Date;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
            controllers: [DailyExpenseController],
            providers: [
                {
                    provide: DailyExpenseUseCases,
                    useValue: {
                        createDailyExpense: jest.fn(),
                    },
                },
                {
                    provide: DailyExpenseFactoryService,
                    useValue: {
                        createNewDailyExpense: jest.fn(),
                    },
                },
                {
                    provide: CategoryUseCases,
                    useValue: {
                        getCategory: jest.fn(),
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

        dailyExpenseController = module.get<DailyExpenseController>(DailyExpenseController);
        mockDailyExpenseUseCases = module.get<DailyExpenseUseCases>(DailyExpenseUseCases);
        mockDailyExpenseFactoryService = module.get<DailyExpenseFactoryService>(DailyExpenseFactoryService);
        mockCategoryUseCases = module.get<CategoryUseCases>(CategoryUseCases);
        mockUserUseCases = module.get<UserUseCases>(UserUseCases);

        date = new Date();

        app = module.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        app.useGlobalFilters(new AllExceptionsFilter());
        await app.init();
    });

    it('should create a financial transaction successfully', async () => {

        const dailyExpenseDto : CreateDailyExpenseDto = {
            name: 'Test Transaction',
            amount: 100,
            description: 'Test Description',
            date: date,
            category_id: 'testCategoryId',
            user_id: 'testUserId',
        };

        const dailyExpense = {
            name: 'Test Transaction',
            amount: 100,
            description: 'Test Description',
            date: date,
            category: 'testCategoryId',
            user: 'testUserId',
        };

        const createdDailyExpense = {
            id: 'mockId',
            name: 'Test Transaction',
            amount: 100,
            description: 'Test Description',
            date: date,
            category: { _id: 'testCategoryId' , name: 'Category Name' },
            user: {
                id: "mockUserId",
                first_name: "mockFirstName",
                last_name: "mockLastName",
                email: "mockEmail@email.com",
                password : "mockPassword",
                authServiceId : "mockAuthServiceId",
            }, 
        }

        mockDailyExpenseFactoryService.createNewDailyExpense = jest.fn().mockReturnValue(dailyExpense);
        mockCategoryUseCases.getCategory = jest.fn().mockResolvedValue({ _id: 'testCategoryId' , name: 'Category Name' });
        mockUserUseCases.getUser = jest.fn().mockResolvedValue({
            id: "mockUserId",
            first_name: "mockFirstName",
            last_name: "mockLastName",
            email: "mockEmail@email.com",
            password : "mockPassword",
            authServiceId : "mockAuthServiceId",
        });
        mockDailyExpenseUseCases.createDailyExpense = jest.fn().mockResolvedValue(createdDailyExpense);

        const response = await dailyExpenseController.createDailyExpense(dailyExpenseDto);

        expect(response).toEqual({
            id: 'mockId',
            name: 'Test Transaction',
            amount: 100,
            description: 'Test Description',
            date : date,
            category: { id: "testCategoryId" , name: 'Category Name' },
            user: {
                id: "mockUserId",
                first_name: "mockFirstName",
                last_name: "mockLastName",
                email: "mockEmail@email.com",
            }
        });
    });

    it('should error 400 when the name of the transaction is not provided on the body of the request', async () => {

        const response = await request(app.getHttpServer())
          .post('/api/dailyExpense')
          .send({
            "name" : "",
            "amount" : 121,
            "description" : "This is a short description",
            "date" : date,
            "category_id" : "65f06fa63028aca452bb6456",
            "user_id" : "65f03bfae0ba1bd41d347b69"
            //TODO the category_id and user_id should be real records on database before testing
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