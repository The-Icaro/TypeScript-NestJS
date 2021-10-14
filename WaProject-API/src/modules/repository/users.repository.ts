import { BadRequestException, ConflictException, InternalServerErrorException } from "@nestjs/common";
import { dateToYMD } from "src/helpers/get-date";
import { EntityRepository, Repository } from "typeorm";
import { CreateUserDTO } from "../admin/dto/create-user.dto";
import { GetUserDTO } from "../admin/dto/get-user.dto";
import { UserTypePermission } from "./user-type.enum";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDTO } from "../users/dto/auth-credentials.dto";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {

  public async getUsers( getUserDto : GetUserDTO ) : Promise<Array<User>> {

    const { name, email, type } = getUserDto;

    const query = this.createQueryBuilder('user');

    if( name )
        query.andWhere(
          'LOWER(user.firstName) LIKE LOWER(:name) OR LOWER(user.secondName) LIKE LOWER(:name)',
        {name: `%${name}%`});
    
    if( email )
        query.andWhere(
          'LOWER(user.email) LIKE LOWER(:email)',
          {email: `%${email}%`});
    
    if( type )
        query.andWhere('user.type = :type', { type })

    const users = await query.getMany();

    return users;

  }

  public async createUser( createUserDto : CreateUserDTO ) : Promise<User> {

    let { firstName, secondName, email, password, type } = createUserDto;

    if (!Object.values(UserTypePermission).includes(type))
      throw new BadRequestException(`${type} is not a Valid User Type`)
      
    const getDate = new Date();
    const date = dateToYMD(getDate);

    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);


    const user = this.create({
      firstName,
      secondName,
      email,
      password,
      type,
      salt,
      created_at : date,
      updated_at : date,
    });

    
    try {
      await this.save(user);
    } catch(error) {
      if (error.code === '23505') { // duplicate email
        throw new ConflictException('Email already exists');
      } else {
        console.log(error)
        throw new InternalServerErrorException();
      }
    }  

    return user;

  }

  public async validateUserPassword( authCredentialsDto : AuthCredentialsDTO ) : Promise<User> {

    const { email, password } = authCredentialsDto;
    const user = await this.findOne({email});

    if( user && await user.validatePassword(password)) {
      return user;
    }else {
      return null;
    }

  }

}