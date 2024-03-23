import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from '@/controllers/category.controller';
import { CategoryUseCases } from '@/use-cases/category/category.use-case';
import { CategoryFactoryService } from '@/use-cases/category/category-factory.service';
import { FinancialTransactionUseCases } from '@/use-cases/financial-transaction/financial-transaction.use-case';
import { DailyExpenseUseCases } from '@/use-cases/daily-expense/daily-expense.use-case';
import { UserUseCases } from '@/use-cases/user/user.use-case';
import { AppModule } from '@/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from '@/error-handling/filters/AllExceptionsFilter';
import * as request from 'supertest';
import { CreateCategoryDto } from '@/core/dtos';

describe('CategoryController', () => {
  let categoryController: CategoryController;
  let mockCategoryUseCases: CategoryUseCases;
  let mockCategoryFactoryService: CategoryFactoryService;
  let mockFinancialTransactionUseCases: FinancialTransactionUseCases;
  let mockDailyExpenseUseCases: DailyExpenseUseCases;
  let mockUserUseCases: UserUseCases;
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
        controllers: [CategoryController],
        providers: [
            {
                provide: CategoryUseCases,
                useValue: {
                  createCategory: jest.fn(),
                },
            },
            {
                provide: CategoryFactoryService,
                useValue: {
                  createNewCategory: jest.fn(),
                },
            },
            {
                provide: FinancialTransactionUseCases,
                useValue: {
                  getAllFinancialTransactionsByCategory: jest.fn(),
                },
            },
            {
                provide: DailyExpenseUseCases,
                useValue: {
                  getAllDailyExpensesByCategory: jest.fn(),
                },
            },
            {
                provide: UserUseCases,
                useValue: {
                  getUser: jest.fn(),
                },
            },
        ],
    }).compile();

    categoryController = module.get<CategoryController>(CategoryController);
    mockCategoryUseCases = module.get<CategoryUseCases>(CategoryUseCases);
    mockCategoryFactoryService = module.get<CategoryFactoryService>(CategoryFactoryService);
    mockFinancialTransactionUseCases = module.get<FinancialTransactionUseCases>(FinancialTransactionUseCases);
    mockDailyExpenseUseCases = module.get<DailyExpenseUseCases>(DailyExpenseUseCases);
    mockUserUseCases = module.get<UserUseCases>(UserUseCases);

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new AllExceptionsFilter());
    await app.init();
  });

  it('should create a category', async () => {
    const categoryDto: CreateCategoryDto = { name: 'Test Category', color: '#9866a6', user_id: 'mockUserId'};
    
    const createdCategory = {
      id: 'mockId',
      name: 'Test Category',
      color : '#9866a6',
      user: {
        id: "mockUserId",
        first_name: "mockFirstName",
        last_name: "mockLastName",
        email: "mockEmail@email.com",
        password : "mockPassword",
        authServiceId : "mockAuthServiceId"
      }
    };

    mockCategoryFactoryService.createNewCategory = jest.fn().mockReturnValue(categoryDto);
    mockUserUseCases.getUser = jest.fn().mockResolvedValue({
      id: "mockUserId",
      first_name: "mockFirstName",
      last_name: "mockLastName",
      email: "mockEmail@email.com",
      password : "mockPassword",
      authServiceId : "mockAuthServiceId",
    });
    mockCategoryUseCases.createCategory = jest.fn().mockResolvedValue(createdCategory);

    const response = await categoryController.createCategory(categoryDto);

    expect(response).toEqual({
      id: 'mockId',
      name: 'Test Category',
      color : '#9866a6',
      user: {
        id: "mockUserId",
        first_name: "mockFirstName",
        last_name: "mockLastName",
        email: "mockEmail@email.com",
      }
    });

  });

  it('should error 400 when the name of the category is not provided on the body of the request', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/category')
      .send({
        name: '',
        color: '#9866a6',
        user_id: '65f03bfae0ba1bd41d347b69'
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
  });
});