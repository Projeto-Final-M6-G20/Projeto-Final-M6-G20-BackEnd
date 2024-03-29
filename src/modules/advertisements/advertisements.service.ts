import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { FiltersAdvertisementDto } from './dto/filters-advertisement.dto';
import { PaginationDto } from './dto/pagination.dto';
import { UpdateAdvertisementDto } from './dto/update-advertisement.dto';
import { Advertisement } from './entities/advertisement.entity';
import { AdvertisementsRepository } from './repositories/advertisements.repository';

@Injectable()
export class AdvertisementsService {
  constructor(private advertisementsRepository: AdvertisementsRepository) { }

  async create(createAdvertisementDto: CreateAdvertisementDto, userId: string) {
    const advertisement = await this.advertisementsRepository.create(
      createAdvertisementDto,
      userId,
    );

    return advertisement;
  }

  async findAll(paginationDto: PaginationDto, filters?: FiltersAdvertisementDto) {
    const { page = "1", limit = "15" } = paginationDto;

    const advertisements = await this.advertisementsRepository.findAll(page, limit, filters);
    return advertisements;
  }

  async findAllUserAd(id: string) {
    const userAdvertisements =
      await this.advertisementsRepository.findAllUserAd(id);
    return userAdvertisements;
  }

  async findAllAvailableUserAd(id: string) {
    const sellerAdvertisements =
      await this.advertisementsRepository.findAllAvailableUserAd(id);
    return sellerAdvertisements;
  }
  async checkAdvertisementExists(id: string): Promise<Advertisement> {
    const advertisement = await this.advertisementsRepository.findOne(id);
    if (!advertisement) {
      throw new NotFoundException('Advertisement not found');
    }
    return advertisement;
  }

  async findOne(id: string) {
    const findAdvertisements = await this.checkAdvertisementExists(id);
    return findAdvertisements;
  }

  async update(id: string, updateAdvertisementDto: UpdateAdvertisementDto) {
    await this.checkAdvertisementExists(id);
    return await this.advertisementsRepository.update(
      id,
      updateAdvertisementDto,
    );
  }

  async remove(id: string) {
    await this.checkAdvertisementExists(id);
    return await this.advertisementsRepository.delete(id);
  }
}
