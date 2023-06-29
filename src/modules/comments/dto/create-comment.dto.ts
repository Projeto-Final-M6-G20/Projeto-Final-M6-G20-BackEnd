import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  createdAt: Date;

  updatedAt: Date;

  deletedAt?: Date;
}
