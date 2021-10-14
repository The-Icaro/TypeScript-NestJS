import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { dateToYMD } from 'src/helpers/get-date';
import { User } from 'src/modules/repository/user.entity';
import { UsersRepository } from 'src/modules/repository/users.repository';
import { UpdateUserPasswordDTO } from '../dto/update-password.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor (
    @InjectRepository(UsersRepository)
    private usersRepository : UsersRepository
  ) {}

  public async updateUserPassword(
    userData : User, 
    setUserPassword: UpdateUserPasswordDTO) : Promise<void> {

    const id = userData.id;

    let { password } = setUserPassword;

    const user = await this.usersRepository.findOne({id: id});
    
    password = await bcrypt.hash(password, user.salt);

    const getDate = new Date();
    const date = dateToYMD(getDate);

    user.password = password;
    user.updated_at = date;
    user.version++

    await this.usersRepository.save(user);


  }

}
