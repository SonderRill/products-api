import { Column, Entity } from 'typeorm'
import { CommonBaseEntity } from '../../common/entites/common-base.entity'

@Entity('products')
export class ProductEntity extends CommonBaseEntity {
    @Column()
    name: string
}
