import { ProductEntity } from './entities/product.entity'
import { Injectable } from '@nestjs/common'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class ProductsService extends TypeOrmCrudService<ProductEntity> {
    constructor(
        @InjectRepository(ProductEntity) repo: Repository<ProductEntity>,
    ) {
        super(repo)
    }
}
