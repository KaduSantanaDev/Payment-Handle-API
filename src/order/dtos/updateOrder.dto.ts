import { IsEnum, IsNumber } from "class-validator";
import { Status } from "../enums/status.enum";

export abstract class UpdateOrder {
  @IsNumber()
  id: number
  @IsEnum(Status)
  status: Status
}
