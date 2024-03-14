import { IsString, IsNumber, IsEnum, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import FinancialType from '@/core/enums/financial-type.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateFinancialTransactionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of the financial transaction' })
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'The amount of the financial transaction' })
  amount: number;

  @IsString()
  @ApiPropertyOptional({ description: 'The description of the financial transaction' })
  description: string;

  @IsEnum(FinancialType)
  @IsNotEmpty()
  @ApiProperty({ enum: FinancialType, description: 'The type of the financial transaction' })
  type: FinancialType;
  
  @ApiProperty({ type : String, description: 'The category id of the financial transaction' })
  category_id: any;

  @IsNotEmpty()
  @ApiProperty({ type : String, description: 'The user id of the financial transaction' })
  user_id: any;
}

export class UpdateFinancialTransactionDto extends PartialType(CreateFinancialTransactionDto) {}
