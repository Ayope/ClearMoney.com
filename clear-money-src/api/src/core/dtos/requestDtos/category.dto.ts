import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of the category' })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ type : String, description: 'The user id of the category' })
  user_id: any;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}