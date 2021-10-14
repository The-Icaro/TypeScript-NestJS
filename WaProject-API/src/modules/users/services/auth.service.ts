import { Injectable} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from 'src/modules/repository/users.repository';
import * as bcrypt from 'bcrypt';
import { User } from 'src/modules/repository/user.entity';

@Injectable()
export class AuthService {
  constructor (
    @InjectRepository(UsersRepository)
    private usersRepository : UsersRepository,
    private jwtService : JwtService
  ) {}

  public async validateUser(email: string, password: string) : Promise<any> {
    
    const user = await this.usersRepository.findOne({email : email});
    
    if (user && bcrypt.compareSync(password, user.password)) {

      const { password, ...result } = user;
      return result;
    }
    
    return null;
  };

  public async login(user: User) {

    const payload = { email: user.email, sub: user.id } // sub = id -> JWT Standards
    
    return {
      acess_token: this.jwtService.sign(payload)
    };

  }

}
