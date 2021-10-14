import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { dateToYMD } from 'src/helpers/get-date';
import { UserTypePermission } from 'src/modules/repository/user-type.enum';
import { User } from 'src/modules/repository/user.entity';
import { UsersRepository } from 'src/modules/repository/users.repository';
import { CreateUserDTO } from '../dto/create-user.dto';
import { GetUserDTO } from '../dto/get-user.dto';

@Injectable()
export class AdminService {
  constructor (
    @InjectRepository(UsersRepository)
    private usersRepository : UsersRepository
  ) {}

  public async getUserById( id : string ) : Promise<User> {

    const findUser = await this.usersRepository.findOne(id);

    if(!findUser)
      throw new NotFoundException(`User -> ${id} Not Found`)
    
    return findUser;

  }

  public async getUsers( getUserDto : GetUserDTO ) : Promise<Array<User>> {
    return this.usersRepository.getUsers( getUserDto );
  }

  public async createUser( createUserDto : CreateUserDTO ) : Promise<User> {
    return this.usersRepository.createUser(createUserDto);
  }

  public async changePermission( 
    id: string, 
    type: UserTypePermission ) : Promise<User> {

      const user = await this.getUserById(id);

      const getDate = new Date();
      const date = dateToYMD(getDate);

      user.type = type;
      user.updated_at = date;
      user.version++
      
      await this.usersRepository.save(user);

      return user;

    }
  
  public async deleteUserById( id: string ) : Promise<void> {

    const user = await this.getUserById(id);

    await this.usersRepository.delete(user);

  }

}
