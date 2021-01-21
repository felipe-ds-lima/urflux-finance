import { Request } from 'express'

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
@Injectable()
export class AppRolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const appRoles = this.reflector.get<string[]>(
      'appRoles',
      context.getHandler()
    )
    if (!appRoles) {
      return true
    }

    const { user }: Request = context.switchToHttp().getRequest()

    return user && appRoles.indexOf(user.appRole) >= 0
  }
}
