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


  @IsOptional()
  price: string

  @IsString()
  @IsOptional()
  description: string;


  @IsOptional()
  year: string


  @IsOptional()
  model: string | []


  @IsOptional()
  fuel_type: string | []


  @IsOptional()
  brand: string | []

  @IsString()
  @IsOptional()
  mileage: string;


  @IsOptional()
  color: string | []

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
