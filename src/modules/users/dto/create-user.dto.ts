import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"
import { hashSync } from "bcryptjs"
import { Transform } from "class-transformer"
import { IsEmailUnique } from "../validators/email.validator"
import { IsCPFUnique } from "../validators/cpf.validator"
import { CreateAddressDto } from "src/modules/addresses/dto/create-address.dto"

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @IsEmailUnique({
    message: 'O email já está em uso',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Transform(({ value }: { value: string }) => hashSync(value, 10), {
    groups: ['transform']
  })
  password: string

  @IsString()
  @IsNotEmpty()
  fullname: string

  @IsString()
  @IsNotEmpty()
  @IsCPFUnique({
    message: 'O CPF já está em uso',
  })
  cpf: string;

  @IsString()
  @IsOptional()
  cellphone: string

  @IsBoolean()
  is_advertiser = false

  @IsString()
  @IsOptional()
  birth_date: string

  @IsString()
  @IsOptional()
  description: string

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

