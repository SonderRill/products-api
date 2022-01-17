import { ApiProperty } from '@nestjs/swagger'

export class Jwt {
    @ApiProperty()
    accessToken: string
}
