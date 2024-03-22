import { ApiProperty } from "@nestjs/swagger";
import { UserWithoutPassword } from "./ResponseUser.dto";
export class ResponseCategoryDto {
    @ApiProperty({ description: 'The ID of the category' })
    id: string;
    
    @ApiProperty({ description: 'The name of the category' })
    name : string

    @ApiProperty({ description: 'The color of the category' })
    color : string
    
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