import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { prisma } from 'src/utils/prisma';

import { createHmac } from 'crypto'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(private jwtService: JwtService) {}

  async validateUser(authPayloadDto: AuthPayloadDto) {
    const { username, password } = authPayloadDto

    const user = await prisma.user.findUnique({
      where: {
        username
      }
    })

    if (!user) {
      return {
        message: "User not found"
      }
    }

    const hash = createHmac('sha256', 'uvletyuolSVetuslVBulBETV158dwa186123486142863')
      .update(password)
      .digest('hex');

    if (user && user.password !== hash) {
      return {
        message: "User not found"
      }
    }

    const returnUserData = {
      id: user.id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin
    }

    const token = this.jwtService.sign(returnUserData)

    return token
  }
}
