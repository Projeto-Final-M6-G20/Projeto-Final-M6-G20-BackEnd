import { Comment } from '../entities/comments.entity';
import { CreateCommentDto } from '../dto/create-comment.dto';

export abstract class CommentsRepository {
  abstract create(
    data: CreateCommentDto,
    userId: string,
    advertisementId: string,
  ): Promise<Comment> | Comment;
  abstract findAllAdComments(id: string): Promise<Comment[]> | Comment[];
}
