import { plainToInstance } from 'class-transformer';
import { PrismaService } from './../../../../database/prisma.service';
import { Injectable } from "@nestjs/common";
import { ImagesRepository } from "../images.repository";
import { UpdateImageDto } from '../../dto/update-image.dto';
import { Image } from '../../entities/image.entity';

@Injectable()
export class ImagesPrismaRepository implements ImagesRepository {
  constructor(private prisma: PrismaService) { }
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