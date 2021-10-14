import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './controllers/admin.controller';
import { UsersRepository } from '../repository/users.repository';
import { AdminService } from './services/admin.service';



@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository])],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
