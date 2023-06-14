import { v4 as uuidv4 } from 'uuid';
export class Address {
  readonly id: string
  street: string
  zip_code: string
  number: string
  city: string
  state: string
  complement?: string
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
