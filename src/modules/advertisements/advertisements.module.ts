import { Module } from '@nestjs/common';
import { AdvertisementsService } from './advertisements.service';
import { AdvertisementsController } from './advertisements.controller';
import { PrismaService } from 'src/database/prisma.service';
import { AdvertisementsRepository } from './repositories/advertisements.repository';
import { AdvertisementsPrismaRepository } from './repositories/prisma/advertisements-prisma.repository';

@Module({
  controllers: [AdvertisementsController],
  providers: [AdvertisementsService, PrismaService, {
    provide: AdvertisementsRepository, useClass: AdvertisementsPrismaRepository
  }],
  exports: [AdvertisementsService],
})
export class AdvertisementsModule { }
