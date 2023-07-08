import { IsEmail, IsNumberString, IsString, IsOptional } from 'class-validator';

export class FindOneParams {
  @IsNumberString()
  @IsOptional()
  id?: number;

  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  username?: string;
}
