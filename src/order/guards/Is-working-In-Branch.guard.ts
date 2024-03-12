import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { EmployeeService } from 'src/employee/service/employee.service';

export class IsWorkingInBranchGuard extends AuthGuard('jwt') {
  constructor(
    private refleactor: Reflector,
    private employeesService: EmployeeService,
  ) {
    super();
  }
  canActivate(context: ExecutionContext) {
    try {
      const req = context.switchToHttp().getRequest<Request>();
      const branch = req.params.branchid;
      const user_id = (req as any).user._id;
      return this.employeesService.IsUserWorkingInBranch(user_id, branch);
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
