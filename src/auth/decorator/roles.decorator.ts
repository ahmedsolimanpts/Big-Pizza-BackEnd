import { SetMetadata } from '@nestjs/common';
import { Roles } from '../enums/roles.enums';

export const ROLES_KEYS = 'roles';
export const Role = (...roles: Roles[]) => SetMetadata(ROLES_KEYS, roles);
