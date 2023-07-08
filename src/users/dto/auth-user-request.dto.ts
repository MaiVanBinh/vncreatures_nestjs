import { IsEmail, IsNumber, IsNumberString, IsString } from 'class-validator';

export class AuthUserRequest {
  @IsString()
  @IsEmail()
  email?: string;

  @IsString()
  username?: string;

  @IsString()
  password?: string;
}
