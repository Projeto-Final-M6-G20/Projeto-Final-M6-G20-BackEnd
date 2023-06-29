import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comments.entity';
import { CommentsRepository } from './repositories/comments.repository';

@Injectable()
export class CommentsService {
  constructor(private commentsRepository: CommentsRepository) {}

  async create(
    createCommentDto: CreateCommentDto,
    userId: string,
    advertisementId: string,
  ) {
    const comment = await this.commentsRepository.create(
      createCommentDto,
      userId,
      advertisementId,
    );

    return comment;
  }

  async findAllAdComments(id: string) {
    const adComments = await this.commentsRepository.findAllAdComments(id);
    return adComments;
  }
}
