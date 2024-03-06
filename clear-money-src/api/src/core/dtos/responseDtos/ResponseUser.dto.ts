import { ApiProperty } from '@nestjs/swagger';
import { User } from "@/core/entities";

type UserWithoutPassword = Omit<User, 'password' | 'authServiceID'> & { id: string };

export class ResponseUserDto {
    @ApiProperty({ description: 'Indicates whether the request was successful or not' })
    success: boolean;

    @ApiProperty({ 
        description: 'User information without password and authServiceID and with mongoDb id',
        type: 'object',
        properties: {
            id: { type: 'string', description: 'User ID' },
            first_name: { type: 'string', description: 'The user\'s first name' },
            last_name: { type: 'string', description: 'The user\'s last name' },
            email: { type: 'string', description: 'The user\'s email address' },
        },
    })
    responseUser: UserWithoutPassword;

    @ApiProperty({
        description: 'Tokens for authentication',
        type: 'object',
        properties: {
            accessToken: { type: 'string', description: 'Access token for authentication' },
            refreshToken: { type: 'string', description: 'Refresh token for obtaining a new access token' },
            expirationTime: { type: 'number', description: 'Expiration time for the access token' },
        },
    })
    tokens: {
        accessToken: string;
        refreshToken: string;
        expirationTime: number;
    }
}