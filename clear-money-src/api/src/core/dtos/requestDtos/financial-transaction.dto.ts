import { IsString, IsNumber, IsEnum, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import FinancialType from '@/core/enums/financial-type.enum';

export class CreateFinancialTransactionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  description: string;

  @IsEnum(FinancialType)
  @IsNotEmpty()
  type: FinancialType;

  category_id: any;

  @IsNotEmpty()
  user_id: any;
}

export class UpdateFinancialTransactionDto extends PartialType(CreateFinancialTransactionDto) {}
