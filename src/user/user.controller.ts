import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  NotFoundException, UseGuards, Request, UseInterceptors, ClassSerializerInterceptor
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';

import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { SignInUserDto } from './dtos/signin-user.dto';
import { Query } from 'typeorm/driver/Query';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../models/roles.enum';
import { RolesGuard } from '../guards/roles-guard';


@Controller('/auth')
export class UserController {
  constructor(
    private userService: UserService, private authService: AuthService,
  ) { }
  
  @Post('/signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
  }

  @Post('/signin')
  async signin(@Body() signInUserDto: SignInUserDto) {
    return this.authService.login(signInUserDto);
  }
  
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    console.log('UserId handler is running');
    const user = await this.userService.findById(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }
  
  @Roles(Role.ADMIN)
  @Get()
  async findAll(@Body('email') email: string) {
    return this.userService.findByEmail(email)
  }
}