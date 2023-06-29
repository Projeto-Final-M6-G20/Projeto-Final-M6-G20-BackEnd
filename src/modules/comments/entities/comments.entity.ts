import { v4 as uuidv4 } from 'uuid';

export class Comment {
  readonly id: string;

  content: string;

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
