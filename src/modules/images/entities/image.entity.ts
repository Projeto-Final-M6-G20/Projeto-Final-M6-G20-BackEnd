import { v4 as uuidv4 } from 'uuid';
export class Image {
  readonly id: string
  url: string




  constructor() {
    this.id = uuidv4();

  }
}
