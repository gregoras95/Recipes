import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { encodePassword } from '../util/bcrypt';
import { CreateUserDto } from './dtos/create-user.dto';
import { BadRequestException } from '@nestjs/common';
import { SignInUserDto } from './dtos/signin-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    const email = createUserDto.email;
    const password = encodePassword(createUserDto.password);

    const users = await this.repository.find({
      where: { email: email },
    });
    if (users.length) {
      throw new BadRequestException('Email in use');
    }

    const user = this.repository.create({
      email,
      password,
    });
    
    return this.repository.save(user);
  }

  findById(id: number) {
    return this.repository.findOneById(id);
  }

  findByEmail(email: string) {
    return this.repository.findOne({ where: { email: email } });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, attrs);
    return this.repository.save(user);
  }

  async remove(id: number) {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.repository.remove(user);
  }
}
