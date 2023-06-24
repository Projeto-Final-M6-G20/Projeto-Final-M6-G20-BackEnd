import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/database/prisma.service';
import { CreateAdvertisementDto } from '../../dto/create-advertisement.dto';
import { UpdateAdvertisementDto } from '../../dto/update-advertisement.dto';
import { Advertisement } from '../../entities/advertisement.entity';
import { AdvertisementsRepository } from '../advertisements.repository';
import { AdvertisementPagination, iFiltersTypes } from '../../dto/pagination.dto';
import { FiltersAdvertisementDto } from '../../dto/filters-advertisement.dto';

@Injectable()
export class AdvertisementsPrismaRepository
  implements AdvertisementsRepository {
  constructor(private prisma: PrismaService) { }

  async create(
    data: CreateAdvertisementDto,
    userId: string,
  ): Promise<Advertisement> {

    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }
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

  async findAll(page: string, limit: string, filters?: FiltersAdvertisementDto): Promise<AdvertisementPagination> {
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const whereFilters: any = {
      is_available: true,
      ...filters,
    };

    if (filters && filters.year) {
      whereFilters.year = parseInt(filters.year);
    }

    if (filters && filters.price) {
      whereFilters.price = parseInt(filters.price);
    }

    const totalCount = await this.prisma.advertisement.count({
      where: {
        is_available: true,
        ...whereFilters,
      }
    });

    const totalPages = Math.ceil(totalCount / limitNumber);

    const advertisements = await this.prisma.advertisement.findMany({
      where: {
        is_available: true,
        ...whereFilters,
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        title: true,
        price: true,
        description: true,
        year: true,
        model: true,
        fuel_type: true,
        brand: true,
        mileage: true,
        color: true,
        fipe_price: true,
        is_available: true,
        userId: true,
        User: {
          select: {
            id: true,
            email: true,
            fullname: true,
            cpf: true,
            cellphone: true,
            is_advertiser: true,
            birth_date: true,
            description: true,
            createdAt: true,
            updatedAt: true,
            deletedAt: true,
          },
        },
      },
      skip,
      take: limitNumber,
    });

    const previousPage = pageNumber > 1 ? pageNumber - 1 : null;
    const nextPage = pageNumber < totalPages ? pageNumber + 1 : null;

    const baseUrl = 'http://localhost:3000/advertisements';
    const queryParamsNext = `limit=${limit}&page=${nextPage}`;
    const queryParamsPrevious = `limit=${limit}&page=${previousPage}`;

    const previousPageLink = previousPage ? `${baseUrl}?${queryParamsPrevious}` : null;
    const nextPageLink = nextPage ? `${baseUrl}?${queryParamsNext}` : null;

    const distinctFilters = await this.prisma.advertisement.findMany({
      select: {
        brand: true,
        model: true,
        color: true,
        year: true,
        fuel_type: true
      },
      distinct: ['brand', 'model', 'color', 'year'],
    });
    const filtersTypes = {
      brands: distinctFilters.map(item => item.brand).filter((value, index, self) => self.indexOf(value) === index),
      models: distinctFilters.map(item => item.model).filter((value, index, self) => self.indexOf(value) === index),
      colors: distinctFilters.map(item => item.color).filter((value, index, self) => self.indexOf(value) === index),
      years: distinctFilters.map(item => item.year).filter((value, index, self) => self.indexOf(value) === index),
      fuel_type: distinctFilters.map(item => item.fuel_type).filter((value, index, self) => self.indexOf(value) === index),
    };
    const typesThisPage: iFiltersTypes = {
      models: [],
      colors: [],
      brands: [],
      years: [],
      fuel_type: []
    }

    advertisements.forEach(ad => {
      if (!typesThisPage.models.includes(ad.model)) {
        typesThisPage.models.push(ad.model);
      }

      if (!typesThisPage.colors.includes(ad.color)) {
        typesThisPage.colors.push(ad.color);
      }

      if (!typesThisPage.years.includes(ad.year)) {
        typesThisPage.years.push(ad.year);
      }
      if (!typesThisPage.brands.includes(ad.brand)) {
        typesThisPage.brands.push(ad.brand);
      }
      if (!typesThisPage.fuel_type.includes(ad.fuel_type)) {
        typesThisPage.fuel_type.push(ad.fuel_type);
      }
    });


    return {
      pagination: {
        totalCount,
        pageNumber,
        limitNumber,
        totalPages,
        previousPageLink,
        nextPageLink,
      },
      filtersTypes,
      filtersTypesThisSearch: typesThisPage,
      data: plainToInstance(Advertisement, advertisements),
    };
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


