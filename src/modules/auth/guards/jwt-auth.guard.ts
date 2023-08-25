import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // private readonly authService: AuthService,
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getClass(),
      context.getHandler(),
    ]);
    if (isPublic) return true;

    return super.canActivate(context);
  }

  handleRequest(error, user) {
    if (user) return user;
    else throw new UnauthorizedException();
  }
}
