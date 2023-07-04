import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/database/prisma.service';
import { CreateCommentDto } from '../../dto/create-comment.dto';
import { Comment } from '../../entities/comments.entity';
import { CommentsRepository } from '../comments.repository';
import { UpdateCommentDto } from '../../dto/update-comment.dto';

@Injectable()
export class CommentsPrismaRepository implements CommentsRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    data: CreateCommentDto,
    userId: string,
    advertisementId: string,
  ): Promise<Comment> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    const advertisement = await this.prisma.advertisement.findUnique({
      where: { id: advertisementId },
    });

    if (!advertisement) {
      throw new Error('Anuncio não encontrado.');
    }

    const { content } = data;
    const commentData = { content: content };

    const comment = new Comment();
    Object.assign(comment, {
      ...commentData,
    });

    const newComment = await this.prisma.comment.create({
      data: { ...comment, userId, advertisementId },
    });

    const findComment = await this.prisma.comment.findFirst({
      where: { id: newComment.id },
      include: {
        user: true,
        advertisement: true,
      },
    });
    return plainToInstance(Comment, findComment);
  }

  async findOne(id: string): Promise<Comment | undefined> {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
    });
    return plainToInstance(Comment, comment);
  }

  async findAllAdComments(id: string): Promise<Comment[]> {
    const adComments = await this.prisma.comment.findMany({
      where: {
        advertisementId: id,
      },
      include: {
        user: true,
        advertisement: true,
      },
    });

    return plainToInstance(Comment, adComments);
  }

  async update(id: string, data: UpdateCommentDto): Promise<Comment> {
    const updatedComment = await this.prisma.comment.update({
      where: { id },
      data: { ...data },
    });
    return plainToInstance(Comment, updatedComment);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.comment.delete({
      where: { id },
    });
  }
}
