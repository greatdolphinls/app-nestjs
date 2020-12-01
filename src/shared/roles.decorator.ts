import { SetMetadata } from '@nestjs/common';

export interface EListOfUSerRoles {
  USER_ADMIN: 'USER_ADMIN';
  USER_REGULAR: 'USER_REGULAR';
}

export function Roles<R extends keyof EListOfUSerRoles>(roles: R[]) {
  return SetMetadata('roles', roles);
}
