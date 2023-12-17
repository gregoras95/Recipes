import { Injectable } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { NotFoundException, BadRequestException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(email: string, rawPassword: string): Promise<boolean> {
    const user = await this.userService.findByEmail(email)
    if (!user) {
      throw new NotFoundException('User not found')
    }
  
    const [salt, storedHash] = user.password.split('|'); 
    const hash = (bcrypt.hashSync(rawPassword, salt))
    if (storedHash !== hash.toString()) {
      throw new BadRequestException('Bad password');
    }
    return true;
  }

  async login(user: any) {
    
    const userValidated = await this.validateUser(user.email, user.password)
    
    if (userValidated) {
      const payload = { name: user.email, sub: user.userId };
      console.log('User is validated');
      return {
        access_token: this.jwtService.sign(payload, { secret: `${process.env.APP_SECRET}` }),
      }
    } else {
      return 'User not found in DB';
    } 
  }
}
