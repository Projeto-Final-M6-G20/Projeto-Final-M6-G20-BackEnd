import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('advertisement/:advertisementId')
  @UseGuards(AuthGuard('jwt'))
  create(
    @Body() createCommentDto: CreateCommentDto,
    @Request() req: any,
    @Param('advertisementId') advertisementId: string,
  ) {
    const userId = req.user.id;
    return this.commentsService.create(
      createCommentDto,
      userId,
      advertisementId,
    );
  }

  @Get('advertisement/:id')
  @UseGuards(AuthGuard('jwt'))
  findAllUserAd(@Request() req: any, @Param('id') id: string) {
    return this.commentsService.findAllAdComments(id);
  }
}
