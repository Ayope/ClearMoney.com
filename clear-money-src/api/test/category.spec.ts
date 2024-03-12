import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from '@/controllers/category.controller';
import { CategoryUseCases } from '@/use-cases/category/category.use-case';
import { CategoryFactoryService } from '@/use-cases/category/category-factory.service';
import { CreateCategoryDto } from '@/core/dtos/requestDtos/category.dto';
import { AppModule } from '@/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from '@/frameworks/error-handling/filters/AllExceptionsFilter';
import * as request from 'supertest';

describe('CategoryController', () => {
  let categoryController: CategoryController;
  let mockCategoryUseCases: CategoryUseCases;
  let mockCategoryFactoryService: CategoryFactoryService;
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
        ],
    }).compile();

    categoryController = module.get<CategoryController>(CategoryController);
    mockCategoryUseCases = module.get<CategoryUseCases>(CategoryUseCases);
    mockCategoryFactoryService = module.get<CategoryFactoryService>(CategoryFactoryService);

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new AllExceptionsFilter());
    await app.init();
  });

  it('should create a category', async () => {
    const categoryDto: CreateCategoryDto = { name: 'Test Category' };
    const createdCategory = {
      id: 'mockId',
      name: 'Test Category'
    };
    mockCategoryFactoryService.createNewCategory = jest.fn().mockReturnValue(categoryDto);
    mockCategoryUseCases.createCategory = jest.fn().mockResolvedValue(createdCategory);

    const response = await categoryController.createCategory(categoryDto);

    expect(response).toEqual({
      id: 'mockId',
      name: 'Test Category'
    });

  });

  it('should error 400 when the name of the category is not provided on the body of the request', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/category')
      .send({
        name: '',
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