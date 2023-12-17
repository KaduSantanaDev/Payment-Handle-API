import { IsEmail, IsEnum, IsInt, IsOptional, IsStrongPassword } from "class-validator";
import { Role } from "../enums/RoleEnum";
import { ApiPropertyOptional, ApiQuery } from "@nestjs/swagger";
import { Query } from "@nestjs/common";

export abstract class EditUserDto {
  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional({description: 'Email that will be enabled.'})
  email?: string

  @IsOptional()
  @IsStrongPassword()
  @ApiPropertyOptional({example: 'Newpassword@123456', description: 'New password.'})
  password?: string

}
