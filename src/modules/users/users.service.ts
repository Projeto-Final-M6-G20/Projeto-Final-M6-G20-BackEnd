import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';
import { ResetUserPasswordDto } from './dto/reset-password';
import { randomUUID } from 'node:crypto';
import { MailService } from 'src/utils/mail.service';

@Injectable()
export class UsersService {

  constructor(
    private usersRepository: UsersRepository,
    private mailService: MailService
  ) { }
  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.create(createUserDto)

    return user
  }

  async findAll() {
    const users = await this.usersRepository.findAll();
    return users
  }

  async findOne(id: string) {
    const findUser = await this.usersRepository.findOne(id)
    if (!findUser) {
      throw new NotFoundException('User not found')
    }
    return await this.usersRepository.findOne(id);
  }
  async findByEmail(email: string) {
    const findUser = await this.usersRepository.findByEmail(email);
    if (!findUser) {
      throw new NotFoundException('User not found')
    }
    return findUser
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const findUser = await this.usersRepository.findOne(id)
    if (!findUser) {
      throw new NotFoundException('User not found')
    }
    return await this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    const findUser = await this.usersRepository.findOne(id)
    if (!findUser) {
      throw new NotFoundException('User not found')
    }
    return await this.usersRepository.delete(id);
  }

  async sendEmailResetPassword(email: string) {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found !');
    }
    const resetToken = randomUUID()

    await this.usersRepository.updateToken(email, resetToken)
    const resetPasswordTemplate = this.mailService.resetPasswordTemplate(email, user.fullname, resetToken)
    await this.mailService.sendEmail(resetPasswordTemplate)

  }
  async resetPassword(password: string, reset_token: string) {
    const user = await this.usersRepository.findByToken(reset_token)
    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return await this.usersRepository.updatePassword(user.id, password);
  }
}
