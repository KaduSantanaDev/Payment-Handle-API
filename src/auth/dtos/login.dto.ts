import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginDto {
  @ApiProperty({description: 'A registered email'})
  @IsEmail()
  email: string
  @ApiProperty({description: 'A registered password'})
  @IsString()
  password: string
}
