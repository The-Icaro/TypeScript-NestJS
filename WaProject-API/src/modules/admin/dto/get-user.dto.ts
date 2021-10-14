import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { UserTypePermission } from "src/modules/repository/user-type.enum";

export class GetUserDTO {

  @IsOptional()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsEnum(UserTypePermission)
  type?: UserTypePermission;

}