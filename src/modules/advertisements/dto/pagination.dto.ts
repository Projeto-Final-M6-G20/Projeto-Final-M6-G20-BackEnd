import { IsOptional, IsPositive } from 'class-validator';
import { Advertisement } from '../entities/advertisement.entity';

export class PaginationDto {
  @IsOptional()
  page?: string;

  @IsOptional()
  limit?: string;
}

export interface AdvertisementPagination {
  totalCount: number;
  pageNumber: number;
  limitNumber: number;
  data: Advertisement[];
}