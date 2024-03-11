import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

export class IsUserCustomerGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
//   canActivate(context: ExecutionContext) {
//     const requestedUser = context.switchToHttp().getRequest().user._id;

//     return false
//   }
}
