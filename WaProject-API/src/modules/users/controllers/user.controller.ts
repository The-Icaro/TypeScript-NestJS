import { Body, Controller, Get, Patch, Post, Request } from '@nestjs/common';
import { User } from 'src/modules/repository/user.entity';
import { UpdateUserPasswordDTO } from '../dto/update-password.dto';
import { UsersService } from '../services/users.service';

@Controller('profile')
export class UsersController {
  constructor(private usersService: UsersService) {}
  
  @Get()
  getUserInfo(@Request() requestData) : User{
    return requestData.user;
  }

  @Post('/update')
  updateUserInfo(
    @Request() requestData,
    @Body() setUserPassword : UpdateUserPasswordDTO
    ) : Promise<void> {
    return this.usersService.updateUserPassword(requestData.user, setUserPassword);
  }

}
