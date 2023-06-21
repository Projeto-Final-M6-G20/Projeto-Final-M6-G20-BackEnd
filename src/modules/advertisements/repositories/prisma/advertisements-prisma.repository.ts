import { Injectable, UseGuards, Request } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/database/prisma.service';
import { CreateAdvertisementDto } from '../../dto/create-advertisement.dto';
import { UpdateAdvertisementDto } from '../../dto/update-advertisement.dto';
import { Advertisement } from '../../entities/advertisement.entity';
import { AdvertisementsRepository } from '../advertisements.repository';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AdvertisementsPrismaRepository
  implements AdvertisementsRepository
{
  constructor(private prisma: PrismaService) {}

  async create(
    data: CreateAdvertisementDto,
    userId: string,
  ): Promise<Advertisement> {
    const advertisement = new Advertisement();
    Object.assign(advertisement, {
      ...data,
      User: { connect: { id: userId } },
    });

    const newAdvertisement = await this.prisma.advertisement.create({
      data: { ...advertisement },
    });

    return plainToInstance(Advertisement, newAdvertisement);
  }

  async findAll(): Promise<Advertisement[]> {
    const advertisements = await this.prisma.advertisement.findMany({
      where: {
        is_available: true,
      },
    });
    return plainToInstance(Advertisement, advertisements);
  }

  async findAllUserAd(id: string): Promise<Advertisement[]> {
    const userAdvertisements = await this.prisma.advertisement.findMany({
      where: {
        userId: id,
      },
    });

    return plainToInstance(Advertisement, userAdvertisements);
  }

  async findOne(id: string): Promise<Advertisement | undefined> {
    const advertisement = await this.prisma.advertisement.findUnique({
      where: { id },
    });
    return plainToInstance(Advertisement, advertisement);
  }

  async update(
    id: string,
    data: UpdateAdvertisementDto,
  ): Promise<Advertisement> {
    const updatedAdvertisement = await this.prisma.advertisement.update({
      where: { id },
      data: { ...data },
    });
    return plainToInstance(Advertisement, updatedAdvertisement);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.advertisement.delete({
      where: { id },
    });
  }
}
