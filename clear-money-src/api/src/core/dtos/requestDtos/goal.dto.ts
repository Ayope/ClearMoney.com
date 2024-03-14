import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNumber, IsEnum, IsNotEmpty, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import SavingFrequency from '@/core/enums/savingFrequency.enum';

export class CreateGoalDto {
  @ApiProperty({ description: 'The name of the goal' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The description of the goal' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'The targeted amount for the goal' })
  @IsNumber()
  @IsNotEmpty()
  targeted_amount: number;

  @ApiProperty({ description: 'The saving frequency for the goal', enum: SavingFrequency })
  @IsEnum(SavingFrequency)
  @IsNotEmpty()
  saving_frequency: SavingFrequency;

  @ApiProperty({ description: 'The targeted date for the goal' })
  @IsDate()
  @IsNotEmpty()
  targeted_date: Date;

  @ApiProperty({ description: 'The user id associated with the goal' })
  @IsNotEmpty()
  user_id: any;
}

export class UpdateGoalDto extends PartialType(CreateGoalDto) {}