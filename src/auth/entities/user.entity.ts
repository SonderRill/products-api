import { Exclude } from 'class-transformer'
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm'
import { CommonBaseEntity } from './../../common/entites/common-base.entity'
import * as bcrypt from 'bcryptjs'
import { ApiProperty } from '@nestjs/swagger'

@Entity('users')
export class UserEntity extends CommonBaseEntity {
    @Column({ unique: true })
    @ApiProperty()
    email: string

    @Column()
    @Exclude()
    password: string

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(): Promise<void> {
        const salt = await bcrypt.genSalt()
        this.password = await bcrypt.hash(this.password, salt)
    }

    async checkPassword(plainPassword: string): Promise<boolean> {
        const isCompare = await bcrypt.compare(plainPassword, this.password)
        return isCompare
    }
}
