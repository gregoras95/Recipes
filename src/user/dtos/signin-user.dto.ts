import { IsBoolean, IsOptional, IsEmail, IsString } from 'class-validator';

export class SignInUserDto {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  // @IsBoolean()
  // role: boolean;
}
