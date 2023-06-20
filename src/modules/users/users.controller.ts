import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, UseGuards, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResetUserPasswordDto } from './dto/reset-password';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  @UseInterceptors(ClassSerializerInterceptor)

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
  @Get('email/:email')
  @UseGuards(JwtAuthGuard)
  findByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @HttpCode(200)
  @Post('resetPassword')
  async sendEmailResetPassword(@Body('email') email: string) {
    await this.usersService.sendEmailResetPassword(email);
    return { message: "Token enviado" }
  }

  @Patch('resetPassword/:token')
  async resetPassword(@Param('token') token: string, @Body('password') password: string) {
    await this.usersService.resetPassword(password, token);

    return { message: "Senha atualizada com sucesso!" }

  }
}
