import { Advertisement } from './../../../advertisements/entities/advertisement.entity';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from './../../../../database/prisma.service';
import { Injectable, NotFoundException } from "@nestjs/common";
import { ImagesRepository } from "../images.repository";
import { UpdateImageDto } from '../../dto/update-image.dto';
import { Image } from '../../entities/image.entity';
import { CreateImageDto } from '../../dto/create-image.dto';

@Injectable()
export class ImagesPrismaRepository implements ImagesRepository {
  constructor(private prisma: PrismaService) { }
  async create(data: CreateImageDto, advertisementId: string): Promise<any> {
    const user = await this.prisma.advertisement.findUnique({ where: { id: advertisementId } });

    if (!user) {
      throw new NotFoundException('Anuncio não encontrado.');
    }

    const { url } = data

    const image = new Image();
    Object.assign(image, {
      url,
      Advertisement: { connect: { id: advertisementId } },
    })

    const newImage = await this.prisma.image.create({
      data: { ...image },
    })

    return plainToInstance(Image, newImage)

  }
  async findOne(id: string): Promise<Image> {
    const image = await this.prisma.image.findUnique({
      where: { id },
    })
    return plainToInstance(Image, image)
  }
  async update(id: string, data: UpdateImageDto): Promise<Image> {
    const image = await this.prisma.image.update({
      where: { id },
      data: { ...data }
    })
    return plainToInstance(Image, image)
  }
  async delete(id: string): Promise<void> {
    await this.prisma.image.delete({
      where: { id },
    })
  }
}