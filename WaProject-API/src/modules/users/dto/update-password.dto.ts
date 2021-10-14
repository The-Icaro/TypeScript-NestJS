import { IsNotEmpty } from "class-validator";

export class UpdateUserPasswordDTO {

  @IsNotEmpty()
  password: string;
  
}