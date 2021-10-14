import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserTypePermission } from 'src/modules/repository/user-type.enum';

export class CreateUserDTO {


  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  secondName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  type: UserTypePermission;

}