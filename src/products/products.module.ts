import { ProductsService } from './products.service'
import { ProductsController } from './products.controller'
import { ProductEntity } from './entities/product.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity])],
    providers: [ProductsService],
    controllers: [ProductsController],
})
export class ProductsModule {}
