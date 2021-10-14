import { Controller, Post, UseGuards, Request, Get } from "@nestjs/common";
import { Public } from "../guard/public.constants";
import { AuthService } from "../services/auth.service";
import { JwtAuthGuard } from "../validators/auth/jwt-auth.guard";
import { LocalAuthGuard } from "../validators/auth/local-auth.guard";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('/login')
  login(@Request() requestData){
    return this.authService.login(requestData.user);
  }
  // Refresh no Token
  
}