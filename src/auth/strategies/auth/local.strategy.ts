import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from 'src/auth/services/auth.service';
import { Strategy } from 'passport-local';
import { AuthUserRequest } from 'src/users/dto/auth-user-request.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const authUserRequest = { username, password } as AuthUserRequest;
    const user = await this.authService.validateUser(authUserRequest);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
