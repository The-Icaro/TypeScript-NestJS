import { Body, Controller, Delete, Get, Param, Patch, Post, Query, SetMetadata, UseGuards } from '@nestjs/common';
import { User } from 'src/modules/repository/user.entity';
import { RolesGuard } from '../guard/roles.guard';
import { CreateUserDTO } from '../dto/create-user.dto';
import { GetUserDTO } from '../dto/get-user.dto';
import { UpdateUserTypeDTO } from '../dto/update-user-type.dto';
import { AdminService } from '../services/admin.service';
import { Roles } from '../guard/roles.constants';

@Controller('user')
export class AdminController {
  constructor(private adminService : AdminService) {}

  @Get()
  @Roles('ADMIN')
  getUsers(@Query() getUserDto: GetUserDTO) : Promise<Array<User>> {
    return this.adminService.getUsers(getUserDto);
  }

  @Get('/:id')
  @Roles('ADMIN')
  getUserById(@Param('id') id:string) : Promise<User> {
    return this.adminService.getUserById(id);
  }

  @Post()
  @Roles('ADMIN')
  createUser(@Body() createUserDto : CreateUserDTO) : Promise<User>{
    return this.adminService.createUser(createUserDto);
  }

  @Patch('/:id/type')
  @Roles('ADMIN')
  updateUserType(
    @Param('id') id: string,
    @Body() updateUserTypeDto : UpdateUserTypeDTO
  ) : Promise<User> {

    const { type } = updateUserTypeDto;
    return this.adminService.changePermission(id, type);

  }

  @Delete('/:id')
  @Roles('ADMIN')
  deleteUserById(@Param('id') id: string) : Promise<void> {
    return this.adminService.deleteUserById(id);
  }


}
