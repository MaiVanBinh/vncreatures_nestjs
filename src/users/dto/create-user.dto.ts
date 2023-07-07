import { IsBoolean, IsEnum, IsString, Length, min } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @IsEnum(UserRole)
  role: UserRole;

  @IsString()
  @Length(3, 20)
  username: string;

  @IsString()
  @Length(3, 100)
  password: string;

  @IsBoolean()
  is_active: boolean;
}
