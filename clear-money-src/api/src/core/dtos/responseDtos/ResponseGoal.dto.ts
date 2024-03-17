import SavingFrequency from '@/core/enums/savingFrequency.enum';
import { ApiProperty } from '@nestjs/swagger';
import { UserWithoutPassword } from '@/core/dtos/responseDtos/ResponseUser.dto';

export class ResponseGoalDto {
  @ApiProperty({ description: 'The unique identifier for a goal' })
  id: string;

  @ApiProperty({ description: 'The name of the goal' })
  name: string;

  @ApiProperty({ description: 'The description of the goal' })
  description: string;

  @ApiProperty({ description: 'The targeted amount for the goal' })
  targeted_amount: number;

  @ApiProperty({ description: 'The saving frequency for the goal' })
  saving_frequency: SavingFrequency;

  @ApiProperty({ description: 'The targeted date for the goal' })
  targeted_date: Date;

  @ApiProperty({ description: 'The current amount of the goal' })
  current_amount: number;

  @ApiProperty({ description: 'The saving amount for the goal' })
  saving_amount: number;

  @ApiProperty({
    description: 'The user of the financial transaction',
    type: 'object',
    properties: {
      id: { type: 'string', description: 'User ID' },
      first_name: { type: 'string', description: "The user's first name" },
      last_name: { type: 'string', description: "The user's last name" },
      email: { type: 'string', description: "The user's email address" },
    },
  })
  user: UserWithoutPassword;
}
