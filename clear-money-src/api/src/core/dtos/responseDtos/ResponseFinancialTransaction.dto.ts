import { UserWithoutPassword } from "./ResponseUser.dto";
import { ResponseCategoryDto } from "./ResposneCategory.dto";
import FinancialType from "@/core/enums/financial-type.enum"
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ResponseFinancialTransactionDto {

    @ApiProperty({ description: 'The id of the financial transaction' })
    id : string

    @ApiProperty({ description: 'The name of the financial transaction' })
    name : string

    @ApiProperty({ description: 'The amount of the financial transaction' })
    amount : number

    @ApiPropertyOptional({ description: 'The description of the financial transaction' })
    description : string

    @ApiProperty({ enum: FinancialType, description: 'The type of the financial transaction' })
    type : FinancialType

    @ApiProperty({ type: () => ResponseCategoryDto, description: 'The category of the financial transaction' })
    category : ResponseCategoryDto

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