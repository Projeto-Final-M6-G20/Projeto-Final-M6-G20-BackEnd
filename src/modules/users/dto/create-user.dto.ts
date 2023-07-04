import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"
import { hashSync } from "bcryptjs"
import { Transform } from "class-transformer"
import { IsEmailUnique } from "../validators/email.validator"
import { IsCPFUnique } from "../validators/cpf.validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @IsEmailUnique({
    message: 'O email já está em uso',
  })
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Transform(({ value }: { value: string }) => hashSync(value, 10), {
    groups: ['transform']
  })
  password: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fullname: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsCPFUnique({
    message: 'O CPF já está em uso',
  })
  cpf: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  cellphone: string

  @ApiProperty()
  @IsBoolean()
  is_advertiser

  @ApiProperty()
  @IsString()
  @IsOptional()
  birth_date: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  street: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  zip_code: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  number: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  city: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  state: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  complement?: string

  createdAt: Date

  updatedAt: Date

  deletedAt?: Date
}

