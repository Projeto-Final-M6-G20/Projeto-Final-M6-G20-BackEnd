import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAdvertisementDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  year: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fuel_type: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  mileage: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  color: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  fipe_price: number;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  is_available?: boolean;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  urls?: string

  createdAt: Date;

  updatedAt: Date;

  deletedAt?: Date;
}
