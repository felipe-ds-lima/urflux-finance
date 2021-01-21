import { SetMetadata } from '@nestjs/common'
import { IAppRole } from 'src/modules/users/enums/app-role'

export const AppRoles = (...appRoles: IAppRole[]) =>
  SetMetadata('appRoles', appRoles)
