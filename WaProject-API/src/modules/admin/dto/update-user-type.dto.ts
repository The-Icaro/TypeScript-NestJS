import { IsEnum, IsNotEmpty } from "class-validator";
import { UserTypePermission } from "src/modules/repository/user-type.enum";

export class UpdateUserTypeDTO {

  @IsNotEmpty()
  @IsEnum(UserTypePermission)
  type: UserTypePermission;

}