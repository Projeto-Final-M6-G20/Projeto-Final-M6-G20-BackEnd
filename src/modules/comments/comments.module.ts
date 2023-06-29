import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { PrismaService } from 'src/database/prisma.service';
import { CommentsRepository } from './repositories/comments.repository';
import { CommentsPrismaRepository } from './repositories/prisma/comments-prisma.repository';

@Module({
  controllers: [CommentsController],
  providers: [
    CommentsService,
    PrismaService,
    {
      provide: CommentsRepository,
      useClass: CommentsPrismaRepository,
    },
  ],
  exports: [CommentsService],
})
export class CommentsModule {}
