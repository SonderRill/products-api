import { AuthModule } from './auth/auth.module'
import { ProductsModule } from './products/products.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { config } from './config/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmConfig } from './config/typeorm.config'

@Module({
    imports: [
        ConfigModule.forRoot(config),
        TypeOrmModule.forRootAsync(typeOrmConfig),
        AuthModule,
        ProductsModule,
    ],
})
export class AppModule {}
