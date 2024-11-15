import { Body, Controller, Post } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { response } from 'express';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() authPayload: AuthPayloadDto) {
    const response = await this.authService.validateUser(authPayload)

    return {
      token: response
    }
  }
}
