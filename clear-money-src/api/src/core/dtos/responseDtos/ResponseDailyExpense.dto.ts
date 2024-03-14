import { UserWithoutPassword } from "./ResponseUser.dto";
import { ResponseCategoryDto } from "./ResposneCategory.dto";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ResponseDailyExpenseDto {

    @ApiProperty({ description: 'The id of the daily expense' })
    id : string

    @ApiProperty({ description: 'The name of the daily expense' })
    name : string

    @ApiProperty({ description: 'The amount of the daily expense' })
    amount : number

    @ApiPropertyOptional({ description: 'The description of the daily expense' })
    description : string

    @ApiProperty({ description: 'The date of the daily expense' })
    date: Date;
    
    @ApiProperty({ type: () => ResponseCategoryDto, description: 'The category of the daily expense' })
    category : ResponseCategoryDto

    @ApiProperty({ 
        description: 'The user of the daily expense', 
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