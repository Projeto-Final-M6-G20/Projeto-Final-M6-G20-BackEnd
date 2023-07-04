import { Comment } from '../entities/comments.entity';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';

export abstract class CommentsRepository {
  abstract create(
    data: CreateCommentDto,
    userId: string,
    advertisementId: string,
  ): Promise<Comment> | Comment;
  abstract findOne(
    id: string,
  ): Promise<Comment | undefined> | Comment | undefined;
  abstract findAllAdComments(id: string): Promise<Comment[]> | Comment[];
  abstract update(
    id: string,
    advertisement: UpdateCommentDto,
  ): Promise<Comment> | Comment;
  abstract delete(id: string): Promise<void> | void;
}
