import { Injectable, HttpStatus, ForbiddenException } from '@nestjs/common';
import { AuthUserRequest } from 'src/users/dto/auth-user-request.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtServiceCustomer } from './jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtServiceCustomer,
  ) {}

  async validateUser(authUserRequest: AuthUserRequest) {
    const user = await this.userService.findOneBy(authUserRequest);

    if (!user) {
      return null;
    }

    const isPasswordValid: boolean = this.jwtService.isPasswordValid(
      authUserRequest.password,
      user.password,
    );

    if (!isPasswordValid) {
      return null;
    }

    delete user.password;
    return user;
  }

  async login(user: User) {
    const { accessToken, refreshToken } = await this.getTokens(
      user.id,
      user.username,
    );

    await this.userService.updateRefreshToken(user.id, refreshToken);

    return {
      data: { access_token: accessToken, refresh_token: refreshToken },
      status: HttpStatus.OK,
      error: null,
    };
  }

  async getTokens(id: number, username: string, userRefreshToken?: string) {
    const accessToken: string = this.jwtService.generateAccessToken(
      username,
      id,
    );
    const refreshToken: string = this.jwtService.generateRefreshToken(
      username,
      id,
      userRefreshToken,
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(refreshToken: string) {
    const { userId } = await this.jwtService.decode(refreshToken);
    const user = await this.userService.findOne(userId);
    if (!user || !user.refresh_token || user.refresh_token != refreshToken)
      throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.username);
    await this.userService.updateRefreshToken(user.id, tokens.refreshToken);
    return {
      data: {
        access_token: tokens.accessToken,
        refresh_token: tokens.refreshToken,
      },
      status: HttpStatus.OK,
      error: null,
    };
  }

  async logout(userId: number) {
    await this.userService.updateRefreshToken(userId, '');
  }
}
