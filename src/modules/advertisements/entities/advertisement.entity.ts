import { v4 as uuidv4 } from 'uuid';

export class Advertisement {
  readonly id: string;

  title: string;
  price: number;
  description: string;
  year: number;
  model: string;
  fuel_type: string;
  brand: string;
  mileage?: string;
  color?: string;
  fipe_price?: number;
  is_available: boolean;


  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

  constructor() {
    this.id = uuidv4();
    this.createdAt = new Date();
    this.updatedAt = this.createdAt;
    this.deletedAt = null;
  }
}
