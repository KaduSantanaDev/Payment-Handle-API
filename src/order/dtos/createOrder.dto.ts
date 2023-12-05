import { IsEnum, IsNumber } from "class-validator";
import { Status } from "../enums/status.enum";

export abstract class CreateOrderDto {
  @IsEnum(Status)
  status: Status
  @IsNumber()
  userId: number
}
