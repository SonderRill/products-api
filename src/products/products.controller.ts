import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard'
import { ProductsService } from './products.service'
import { ProductEntity } from './entities/product.entity'
import { Crud, CrudController } from '@nestjsx/crud'
import { Controller, UseGuards } from '@nestjs/common'

@Crud({
    model: {
        type: ProductEntity,
    },
    validation: { transform: true },
    params: {
        id: {
            field: 'id',
            type: 'uuid',
            primary: true,
        },
    },
    query: {
        cache: 1000 * 60 * 2,
    },
    routes: {
        createOneBase: {
            decorators: [UseGuards(JwtAuthGuard)],
        },
        createManyBase: {
            decorators: [UseGuards(JwtAuthGuard)],
        },
        updateOneBase: {
            decorators: [UseGuards(JwtAuthGuard)],
        },
        replaceOneBase: {
            decorators: [UseGuards(JwtAuthGuard)],
        },
        deleteOneBase: {
            decorators: [UseGuards(JwtAuthGuard)],
        },
    },
})
@Controller('products')
export class ProductsController implements CrudController<ProductEntity> {
    constructor(public service: ProductsService) {}
}
