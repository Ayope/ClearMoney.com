import { IsString, IsNumber, IsDate, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDateNotInPast } from '@/core/decorators/IsDateNotInPast';
export class CreateDailyExpenseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of the daily expense' })
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'The amount of the daily expense' })
  amount: number;

  @IsString()
  @ApiPropertyOptional({ description: 'The description of the daily expense' })
  description: string;

  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDateNotInPast({ message: 'Date cannot be in the future' })
  @ApiProperty({ description: 'The date of the daily expense' })
  date: Date;

  @ApiProperty({ description: 'The category of the daily expense' })
  category_id: any;

  @IsNotEmpty()
  user_id: any;
}

export class UpdateDailyExpenseDto extends PartialType(CreateDailyExpenseDto) {}
