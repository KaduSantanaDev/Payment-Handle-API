import { IsEmail, IsEnum, IsInt, IsOptional, IsStrongPassword } from "class-validator";
import { Role } from "../enums/RoleEnum";

export abstract class EditUserDto {
  @IsOptional()
  @IsEmail()
  email?: string

  @IsOptional()
  @IsStrongPassword()
  password?: string

  @IsOptional()
  @IsEnum(Role)
  role?: Role
}
