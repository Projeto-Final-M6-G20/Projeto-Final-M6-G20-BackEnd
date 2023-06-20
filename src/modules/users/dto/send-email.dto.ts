import { IsNotEmpty, IsString, } from "class-validator"


export class SendEmailDto {
  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  text: string

  @IsString()
  @IsNotEmpty()
  to: string
}

