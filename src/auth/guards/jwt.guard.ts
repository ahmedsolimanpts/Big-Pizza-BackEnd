import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JWTGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const is_public = this.reflector.getAllAndOverride<string>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (is_public) return true;
    return super.canActivate(context);
  }
}
