import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { EmployeeService } from '../employee.service';

export class IsEmployeeGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private empService: EmployeeService,
  ) {
    super();
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const user = context.switchToHttp().getRequest().user;
      return this.empService.IsUserEmployee(user._id);
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
