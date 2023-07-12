import { Injectable, HttpStatus, ForbiddenException } from '@nestjs/common';
import { AuthUserRequest } from 'src/users/dto/auth-user-request.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtServiceCustomer } from './jwt.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtServiceCustomer,
    private readonly configService: ConfigService,
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
    const { access_token: accessToken, refresh_token: refreshToken } =
      await this.getTokens(user.id, user.username);

    await this.userService.updateRefreshToken(user.id, refreshToken);

    return {
      data: { access_token: accessToken, refresh_token: refreshToken },
      status: HttpStatus.OK,
      error: null,
    };
  }

  async genTokenFormClient() {
    const token = this.getTokens(-1, 'vncreatures');
    return token;
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
    const jwtConfigRefresh = this.configService.get('jwtConfigRefresh');
    const jwtConfig = this.configService.get('jwtConfig');

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: jwtConfig.signOptions.expiresIn.replace('h', ''),
      expires_in_refresh: jwtConfigRefresh.signOptions.expiresIn.replace(
        'h',
        '',
      ),
    };
  }

  async refreshTokens(refreshToken: string) {
    const { userId } = await this.jwtService.decode(refreshToken);
    const user = await this.userService.findOne(userId);
    if (!user || !user.refresh_token || user.refresh_token != refreshToken)
      throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.username);
    await this.userService.updateRefreshToken(user.id, tokens.refresh_token);
    return {
      data: {
        tokens,
      },
      status: HttpStatus.OK,
      error: null,
    };
  }

  async logout(userId: number) {
    await this.userService.updateRefreshToken(userId, '');
  }
}
