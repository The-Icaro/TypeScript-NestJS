import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/user.controller';
import { UsersRepository } from '../repository/users.repository';
import { UsersService } from './services/users.service';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './validators/auth/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './validators/auth/constants';
import { JwtStrategy } from './validators/auth/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './validators/auth/jwt-auth.guard';



@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository]), 
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' }
    })
  ],
  controllers: [UsersController, AuthController],
  providers: [UsersService, AuthService, LocalStrategy, JwtStrategy, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard
  }],
  exports: [UsersService, AuthService, JwtModule]
})
export class UsersModule {}
