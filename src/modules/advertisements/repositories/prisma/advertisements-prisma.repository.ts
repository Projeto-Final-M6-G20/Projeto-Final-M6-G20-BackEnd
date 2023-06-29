import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/database/prisma.service';
import { CreateAdvertisementDto } from '../../dto/create-advertisement.dto';
import { UpdateAdvertisementDto } from '../../dto/update-advertisement.dto';
import { Advertisement } from '../../entities/advertisement.entity';
import { AdvertisementsRepository } from '../advertisements.repository';
import { AdvertisementPagination, iFiltersTypes } from '../../dto/pagination.dto';
import { FiltersAdvertisementDto } from '../../dto/filters-advertisement.dto';
import { Image } from 'src/modules/images/entities/image.entity';

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

    const { url, ...advertisementData } = data
    const urlImage = {
      url: url
    }
    if (!url) urlImage.url = ''

    const image = new Image()
    Object.assign(image, urlImage)


    const advertisement = new Advertisement();
    Object.assign(advertisement, {
      ...advertisementData,
      User: { connect: { id: userId } },
      images: {
        create: {
          ...image
        }
      }

    });

    const newAdvertisement = await this.prisma.advertisement.create({
      data: { ...advertisement },
    });

    const findAd = await this.prisma.advertisement.findFirst({
      where: { id: advertisement.id },
      include: {
        images: true
      }
    })
    return plainToInstance(Advertisement, findAd);
  }

  async findAll(page: string, limit: string, filters?: FiltersAdvertisementDto): Promise<AdvertisementPagination> {
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const whereFilters: any = {
      is_available: true,
      ...filters,
    };
    function applyFilter(property: string) {
      if (filters && filters[property] && Array.isArray(filters[property])) {
        whereFilters[property] = {
          in: filters[property].map((value: string) => value),
        };
      }
    }
    if (filters && filters.minimaMileage) {
      delete whereFilters.minimaMileage;
      whereFilters.mileage = {
        ...(whereFilters.mileage || {}),
        gte: filters.minimaMileage,
      };
    }

    if (filters && filters.maximaMileage) {
      delete whereFilters.maximaMileage;
      whereFilters.mileage = {
        ...(whereFilters.mileage || {}),
        lte: filters.maximaMileage,
      };
    }
    if (filters && filters.minimaPrice) {
      delete whereFilters.minimaPrice;
      whereFilters.price = {
        ...(whereFilters.price || {}),
        gte: parseInt(filters.minimaPrice),
      };
    }
    if (filters && filters.maximaPrice) {
      delete whereFilters.maximaPrice;
      whereFilters.price = {
        ...(whereFilters.price || {}),
        lte: parseInt(filters.maximaPrice),
      };
    }

    if (filters && filters.year) {
      whereFilters.year = parseInt(filters.year);
    }

    if (filters && filters.price) {
      whereFilters.price = parseInt(filters.price);
    }

    applyFilter('brand');
    applyFilter('model');
    applyFilter('color');
    applyFilter('fuel_type');

    const totalCount = await this.prisma.advertisement.count({
      where: {
        ...whereFilters,
      }
    });

    const totalPages = Math.ceil(totalCount / limitNumber);

    const advertisements = await this.prisma.advertisement.findMany({
      where: {
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
        images: {
          select: {
            url: true
          }
        }
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
      filtersTypesThisSearch: typesThisPage,
      data: plainToInstance(Advertisement, advertisements),
      filtersTypes,
    };
  }

  async findAllUserAd(id: string): Promise<Advertisement[]> {
    const userAdvertisements = await this.prisma.advertisement.findMany({
      where: {
        userId: id,
      },
      include: {
        images: {
          select: {
            url: true
          }
        }
      }
    });

    return plainToInstance(Advertisement, userAdvertisements);
  }

  async findAllAvailableUserAd(id: string): Promise<Advertisement[]> {
    const userAdvertisements = await this.prisma.advertisement.findMany({
      where: {
        userId: id,
        is_available: true
      },
      include: {
        images: {
          select: {
            url: true
          }
        }
      }
    });

    return plainToInstance(Advertisement, userAdvertisements);

  }


  async findOne(id: string): Promise<Advertisement | undefined> {
    const advertisement = await this.prisma.advertisement.findUnique({
      where: { id },
      include: {
        images: {
          select: {
            url: true
          }
        },
        User: {
          select: {
            id: true,
            email: true,
            fullname: true,
            cellphone: true,
            is_advertiser: true,
            birth_date: true,
            description: true,
          }
        }

      }
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


