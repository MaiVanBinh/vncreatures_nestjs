import { IsEmail, IsNumber, IsNumberString, IsString } from 'class-validator';

export class FindOneParams {
  @IsNumberString()
  id: number;

  @IsString()
  @IsEmail()
  email?: string;

  @IsString()
  user_name?: string;
}
