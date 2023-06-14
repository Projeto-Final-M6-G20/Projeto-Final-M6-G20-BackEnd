import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  street: string

  @IsString()
  @IsNotEmpty()
  zip_code: string

  @IsString()
  @IsNotEmpty()
  number: string

  @IsString()
  @IsNotEmpty()
  city: string

  @IsString()
  @IsNotEmpty()
  state: string

  @IsString()
  @IsOptional()
  complement?: string

  createdAt: Date

  updatedAt: Date

  deletedAt?: Date
}
