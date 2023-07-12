import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';

@Injectable()
export class ClientAuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const clientAuth = this.configService.get('clientAuth');
    const { api_client_secret, api_client_id } = request?.body;

    if (
      clientAuth.api_client_secret !== api_client_secret ||
      clientAuth.api_client_id !== api_client_id
    ) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
