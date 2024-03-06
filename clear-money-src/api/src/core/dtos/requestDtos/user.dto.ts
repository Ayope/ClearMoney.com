import { IsString, IsEmail, IsNotEmpty, MinLength, Matches } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The user\'s first name' })
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The user\'s last name' })
  last_name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'The user\'s email address' })
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.',
  })
  @IsNotEmpty()
  @ApiProperty({ description: 'The user\'s password' })
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}