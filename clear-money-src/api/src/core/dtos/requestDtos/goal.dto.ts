import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNumber, IsEnum, IsNotEmpty, IsDate, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import SavingFrequency from '@/core/enums/savingFrequency.enum';
import { IsDateNotInPast } from '@/core/decorators/IsDateNotInPast';
import { Transform } from 'class-transformer';

export class CreateGoalDto {
  @ApiProperty({ description: 'The name of the goal' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The description of the goal' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'The targeted amount for the goal' })
  @IsNumber()
  @IsNotEmpty()
  targeted_amount: number;

  @ApiProperty({ description: 'The saving frequency for the goal', enum: SavingFrequency })
  @IsEnum(SavingFrequency)
  @IsNotEmpty()
  saving_frequency: SavingFrequency;

  @ApiProperty({ description: 'The starting date for the goal' })
  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  starting_date: Date;

  @ApiProperty({ description: 'The targeted date for the goal' })
  @IsDate()
  @IsNotEmpty()
  @IsDateNotInPast({ message: 'Date cannot be in the past' })
  @Transform(({ value }) => new Date(value))
  targeted_date: Date;

  @ApiProperty({ type : String, description: 'The user id associated with the goal' })
  @IsNotEmpty()
  user_id: any;
}

export class UpdateGoalDto extends PartialType(CreateGoalDto) {
  @ApiProperty({ description: 'The current amount of the goal', required: false })
  @IsNumber()
  @IsOptional()
  current_amount: number;
}