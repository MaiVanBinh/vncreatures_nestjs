import {
  Controller,
  Get,
  Patch,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { RefreshTokenGuard } from './guard/refreshToken.guard';
import { ClientAuthGuard } from './guard/client.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(ClientAuthGuard)
  @Post('Oauth')
  async Oauth() {
    return this.authService.genTokenFormClient();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: any) {
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(refreshToken);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh-oauth')
  refreshOauthTokens() {
    return this.authService.genTokenFormClient();
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(@Req() req) {
    const { userId } = req.user;
    await this.authService.logout(userId);
    return { message: 'Logout all message' };
  }
}
