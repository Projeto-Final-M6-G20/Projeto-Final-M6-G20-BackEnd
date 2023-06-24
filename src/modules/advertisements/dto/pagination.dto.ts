import { IsOptional, IsPositive } from 'class-validator';
import { Advertisement } from '../entities/advertisement.entity';

export class PaginationDto {
  @IsOptional()
  page?: string;

  @IsOptional()
  limit?: string;
}

export interface AdvertisementPagination {
  pagination: {
    totalCount: number;
    pageNumber: number;
    limitNumber: number;
    totalPages: number;
    previousPageLink: string;
    nextPageLink: string;
  };
  filtersTypes: {
    brands: string[];
    models: string[];
    colors: string[];
    years: number[];
    fuel_type: string[]
  };
  data: Advertisement[];
}