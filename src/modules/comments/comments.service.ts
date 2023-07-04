import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comments.entity';
import { CommentsRepository } from './repositories/comments.repository';
import { UpdateCommentDto } from './dto/update-comment.dto';

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

  async findOne(id: string) {
    const findComments = await this.checkCommentExists(id);
    return findComments;
  }

  async checkCommentExists(id: string): Promise<Comment> {
    const comment = await this.commentsRepository.findOne(id);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return comment;
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    await this.checkCommentExists(id);
    return await this.commentsRepository.update(id, updateCommentDto);
  }

  async remove(id: string) {
    await this.checkCommentExists(id);
    return await this.commentsRepository.delete(id);
  }
}
