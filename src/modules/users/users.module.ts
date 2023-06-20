import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/database/prisma.service';
import { UsersRepository } from './repositories/users.repository';
import { UsersPrismaRepository } from './repositories/prisma/users-prisma.repository';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from 'src/utils/mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      defaults: {
        from: `"No Reply" <${process.env.SMTP_USER}>`,
      }
    })
  ],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, MailService, {
    provide: UsersRepository, useClass: UsersPrismaRepository
  }],
  exports: [UsersService]
})
export class UsersModule { }
