import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport/dist';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { JwtStrategy } from './jwt.strategy';
import { jwtConfig } from './jwt.config';

@Module({
  imports: [UserModule, PassportModule,
    JwtModule.registerAsync(jwtConfig),
  TypeOrmModule.forFeature([User])],
  providers: [AuthService, UserService, JwtStrategy
  ],
})
export class AuthModule {}
