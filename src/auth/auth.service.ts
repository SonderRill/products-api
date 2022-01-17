import { Jwt } from './interfaces/jwt.interface'
import { LoginDto } from './dtos/login.dto'
import { RegisterDto } from './dtos/register.dto'
import { UserEntity } from './entities/user.entity'
import {
    ConflictException,
    Injectable,
    Logger,
    UnauthorizedException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
    private _logger = new Logger(AuthService.name)

    constructor(
        @InjectRepository(UserEntity)
        private readonly _userRepository: Repository<UserEntity>,
        private readonly _jwtService: JwtService,
    ) {}

    async register({ email, password }: RegisterDto): Promise<UserEntity> {
        try {
            let user = await this._userRepository.findOne({ email })

            if (user) {
                throw new ConflictException(
                    `User with mail ${email} already exists`,
                )
            }

            user = this._userRepository.create({
                email,
                password,
            })

            await this._userRepository.save(user)

            return user
        } catch (error) {
            this._logger.debug(error, 'register method error')
            throw error
        }
    }

    async login({ password, email }: LoginDto): Promise<Jwt> {
        try {
            const user = await this._userRepository.findOne({ email })

            if (!user) {
                throw new UnauthorizedException(
                    `There isn't any user with email: ${email}`,
                )
            }

            const isCompare = await user.checkPassword(password)

            if (!isCompare) {
                throw new UnauthorizedException(`Incorrect email or password`)
            }

            const payload = {
                sub: user.id,
                email: user.email,
            }

            const accessToken = this._jwtService.sign(payload)

            return { accessToken }
        } catch (error) {
            this._logger.debug(error, 'login method error')
            throw error
        }
    }
}
