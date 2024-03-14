import { ApiProperty } from "@nestjs/swagger";
export class ResponseCategoryDto {
    @ApiProperty({ description: 'The ID of the category' })
    id: string;
    
    @ApiProperty({ description: 'The name of the category' })
    name : string
}