import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class FiltersAdvertisementDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  price: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  year: string;

  @IsString()
  @IsOptional()
  model: string;

  @IsString()
  @IsOptional()
  fuel_type: string;

  @IsString()
  @IsOptional()
  brand: string;

  @IsString()
  @IsOptional()
  mileage: string;

  @IsString()
  @IsOptional()
  color: string;

  @IsString()
  @IsOptional()
  fipe_price: string
  @IsBoolean()
  @IsOptional()
  is_available?: boolean;

  createdAt: Date;

  updatedAt: Date;

  deletedAt?: Date;
}
