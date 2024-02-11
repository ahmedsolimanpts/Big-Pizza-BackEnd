import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ROLES_KEYS } from '../decorator/roles.decorator';
import { Roles } from '../enums/roles.enums';

@Injectable()
export class RolesGuard extends AuthGuard('jwt') {
  constructor(private reflactor: Reflector) {
    super();
  }
  async canActivate(context: ExecutionContext) {
    try {
      const isPublic = this.reflactor.getAllAndOverride<Roles>(ROLES_KEYS, [
        context.getClass(),
        context.getHandler(),
      ]);
      const user = context.switchToHttp().getRequest().user;
      if (user) {
        return user.roles.some((role) => isPublic.includes(role));
      }
      return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
