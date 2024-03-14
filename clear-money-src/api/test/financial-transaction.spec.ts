import { FinancialTransactionController } from "@/controllers/financial-transaction.controller";
import { FinancialTransactionUseCases } from "@/use-cases/financial-transaction/financial-transaction.use-case";
import { FinancialTransactionFactoryService } from "@/use-cases/financial-transaction/financial-transaction-factory.service";
import { AppModule } from "@/app.module";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { AllExceptionsFilter } from "@/frameworks/error-handling/filters/AllExceptionsFilter";
import { Test, TestingModule } from "@nestjs/testing";
import FinancialType from "@/core/enums/financial-type.enum";
import { CreateFinancialTransactionDto } from "@/core/dtos";
import { CategoryUseCases } from "@/use-cases/category/category.use-case";
import { UserUseCases } from "@/use-cases/user/user.use-case";
import * as request from 'supertest';


describe('FinancialTransactionController', () => {
    let financialTransactionController: FinancialTransactionController;
    let mockFinancialTransactionUseCases: FinancialTransactionUseCases;
    let mockFinancialTransactionFactoryService: FinancialTransactionFactoryService;
    let mockCategoryUseCases: CategoryUseCases;
    let mockUserUseCases: UserUseCases;
    let app: INestApplication;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
            controllers: [FinancialTransactionController],
            providers: [
                {
                    provide: FinancialTransactionUseCases,
                    useValue: {
                        createFinancialTransaction: jest.fn(),
                    },
                },
                {
                    provide: FinancialTransactionFactoryService,
                    useValue: {
                        createNewFinancialTransaction: jest.fn(),
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

        financialTransactionController = module.get<FinancialTransactionController>(FinancialTransactionController);
        mockFinancialTransactionUseCases = module.get<FinancialTransactionUseCases>(FinancialTransactionUseCases);
        mockFinancialTransactionFactoryService = module.get<FinancialTransactionFactoryService>(FinancialTransactionFactoryService);
        mockCategoryUseCases = module.get<CategoryUseCases>(CategoryUseCases);
        mockUserUseCases = module.get<UserUseCases>(UserUseCases);

        app = module.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        app.useGlobalFilters(new AllExceptionsFilter());
        await app.init();
    });

    it('should create a financial transaction successfully', async () => {
        const financialTransactionDto : CreateFinancialTransactionDto = {
            name: 'Test Transaction',
            amount: 100,
            description: 'Test Description',
            type: FinancialType.Expense,
            category_id: 'testCategoryId',
            user_id: 'testUserId',
        };

        const financialTransaction = {
            name: 'Test Transaction',
            amount: 100,
            description: 'Test Description',
            type: FinancialType.Expense,
            category: 'testCategoryId',
            user: 'testUserId',
        };

        const createdFinancialTransaction = {
            id: 'mockId',
            name: 'Test Transaction',
            amount: 100,
            description: 'Test Description',
            type: FinancialType.Expense,
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

        mockFinancialTransactionFactoryService.createNewFinancialTransaction = jest.fn().mockReturnValue(financialTransaction);
        mockCategoryUseCases.getCategory = jest.fn().mockResolvedValue({ _id: 'testCategoryId' , name: 'Category Name' });
        mockUserUseCases.getUser = jest.fn().mockResolvedValue({
            id: "mockUserId",
            first_name: "mockFirstName",
            last_name: "mockLastName",
            email: "mockEmail@email.com",
            password : "mockPassword",
            authServiceId : "mockAuthServiceId",
        });
        mockFinancialTransactionUseCases.createFinancialTransaction = jest.fn().mockResolvedValue(createdFinancialTransaction);

        const response = await financialTransactionController.createFinancialTransaction(financialTransactionDto);

        expect(response).toEqual({
            id: 'mockId',
            name: 'Test Transaction',
            amount: 100,
            description: 'Test Description',
            type: FinancialType.Expense,
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
          .post('/api/financialTransaction')
          .send({
            "name" : "",
            "amount" : 121,
            "description" : "This is a short description",
            "type" : "expense",
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