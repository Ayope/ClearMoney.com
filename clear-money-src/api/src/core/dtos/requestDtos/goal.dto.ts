import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNumber, IsEnum, IsNotEmpty, IsDate } from 'class-validator';
import SavingFrequency from '@/core/enums/savingFrequency.enum';

export class CreateGoalDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  targeted_amount: number;

  // these two are auto-generated

  // @IsNumber()
  // @IsNotEmpty()
  // current_amount: number;

  // @IsNumber()
  // @IsNotEmpty()
  // saving_amount: number;

  @IsEnum(SavingFrequency)
  @IsNotEmpty()
  saving_frequency: SavingFrequency;

  @IsDate()
  @IsNotEmpty()
  targeted_date: Date;

  @IsNotEmpty()
  user_id: any;
}

export class UpdateGoalDto extends PartialType(CreateGoalDto) {}
