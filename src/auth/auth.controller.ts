import { LoginDto } from './dtos/login.dto'
import { Jwt } from './interfaces/jwt.interface'
import { UserEntity } from './entities/user.entity'
import { RegisterDto } from './dtos/register.dto'
import { AuthService } from './auth.service'
import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    UseInterceptors,
} from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'

@Controller('auth')
export class AuthController {
    constructor(private readonly _authService: AuthService) {}

    @ApiResponse({
        type: UserEntity,
        status: 201,
    })
    @UseInterceptors(ClassSerializerInterceptor)
    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() input: RegisterDto): Promise<UserEntity> {
        const user = await this._authService.register(input)

        return user
    }

    @ApiResponse({
        type: Jwt,
        status: 200,
    })
    @Get('login')
    async login(@Body() input: LoginDto): Promise<Jwt> {
        const accessToken = await this._authService.login(input)

        return accessToken
    }
}
