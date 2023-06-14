import { Exclude, Type } from 'class-transformer';
import { Address } from 'src/modules/addresses/entities/address.entity';
import { v4 as uuidv4 } from 'uuid';

export class User {
  readonly id: string
  email: string

  @Exclude()
  password: string

  fullname: string
  cpf: string
  cellphone?: string
  is_advertiser: boolean
  birth_date?: Date
  description?: string
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date

  constructor() {
    this.id = uuidv4();
    this.createdAt = new Date();
    this.updatedAt = this.createdAt
    this.deletedAt = null
  }
}
