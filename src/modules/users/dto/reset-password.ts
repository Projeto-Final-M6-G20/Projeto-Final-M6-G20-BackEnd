import { hashSync } from "bcryptjs";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, MinLength } from "class-validator";


export class ResetUserPasswordDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Transform(({ value }: { value: string }) => hashSync(value, 10), {
    groups: ['transform']
  })
  password: string
}