import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class ATGuard extends AuthGuard('jwt') {
  constructor(private refleactor: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext) {
    try {
      const isPublic = this.refleactor.getAllAndOverride('isPublic', [
        context.getClass(),
        context.getHandler(),
      ]);
      if (isPublic) return true;
      return super.canActivate(context);
    } catch (err) {
      console.log(err);
    }
  }
}
