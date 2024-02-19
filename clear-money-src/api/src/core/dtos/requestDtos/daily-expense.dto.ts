import { IsString, IsNumber, IsDate, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateDailyExpenseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDate()
  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  category_id: any;

  @IsNotEmpty()
  user_id: any;
}

export class UpdateDailyExpenseDto extends PartialType(CreateDailyExpenseDto) {}
