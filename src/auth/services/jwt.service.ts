import { Injectable } from '@nestjs/common';
import { JwtService as Jwt } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtServiceCustomer {
  // @InjectRepository(User)
  // private readonly repository: Repository<User>;

  private readonly jwt: Jwt;

  constructor(jwt: Jwt, private readonly configService: ConfigService) {
    this.jwt = jwt;
  }

  // Decoding the JWT Token
  public async decode(token: string): Promise<any> {
    return this.jwt.decode(token, null);
  }

  // Get User by User ID we get from decode()
  // public async validateUser(decoded: any): Promise<User> {
  //   return this.repository.findOne(decoded.id);
  // }

  // Generate JWT Token
  public generateAccessToken(username: string, id: number): string {
    return this.jwt.sign({ id, username });
  }

  // Generate JWT Token
  public generateRefreshToken(
    username: string,
    id: number,
    refreshToken?: string,
  ): string {
    const jwtConfigRefresh = this.configService.get('jwtConfigRefresh');
    return this.jwt.sign(
      { id, username, refreshToken },
      {
        secret: jwtConfigRefresh.secret,
        expiresIn: jwtConfigRefresh.signOptions.expiresIn,
      },
    );
  }

  // Validate User's password
  public isPasswordValid(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword);
  }

  // Encode User's password
  public encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
  }

  // Validate JWT Token, throw forbidden error if JWT Token is invalid
  public async verify(token: string): Promise<any> {
    try {
      return this.jwt.verify(token);
    } catch (err) {}
  }
}
