import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { ImagesRepository } from './repositories/images.repository';

@Injectable()
export class ImagesService {

  constructor(private imagesRepository: ImagesRepository) { }

  create(createImageDto: CreateImageDto) {
    return 'This action adds a new image';
  }

  findAll() {
    return `This action returns all images`;
  }

  async findOne(id: string) {
    const findImage = await this.imagesRepository.findOne(id)
    if (!findImage) {
      throw new NotFoundException('Image not found')
    }
    return findImage
  }

  async update(id: string, updateImageDto: UpdateImageDto) {
    const findImage = await this.imagesRepository.findOne(id)
    if (!findImage) {
      throw new NotFoundException('Image not found')
    }
    return await this.imagesRepository.update(id, updateImageDto)
  }

  async remove(id: string) {
    const findImage = await this.imagesRepository.findOne(id)
    if (!findImage) {
      throw new NotFoundException('Image not found')
    }
    return await this.imagesRepository.delete(id)
  }
}
