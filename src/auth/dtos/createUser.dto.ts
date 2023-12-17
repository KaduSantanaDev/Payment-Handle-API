import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, IsStrongPassword } from "class-validator"


export class CreateUserDto{
  @ApiProperty({example: 'John Doe', description: 'Full name of the user'})
  @IsString()
  name: string
  @ApiProperty({description: 'Email of the user'})
  @IsEmail()
  email: string
  @ApiProperty({example: 'Yourstrongpassword@123456', description: 'Strong password'})
  @IsStrongPassword()
  password: string
}
