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
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateCommentDto } from './dto/update-comment.dto';

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
  findAllUserAd(@Param('id') id: string) {
    return this.commentsService.findAllAdComments(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(id, updateCommentDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
}
