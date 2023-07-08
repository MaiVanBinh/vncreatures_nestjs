import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/auth/local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/auth/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtServiceCustomer } from './services/jwt.service';
import { RefreshTokenStrategy } from './strategies/auth/refreshToken.strategy';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get('jwtConfig'),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtServiceCustomer,
    RefreshTokenStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
