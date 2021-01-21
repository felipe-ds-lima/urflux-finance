/* eslint-disable @typescript-eslint/naming-convention */
import 'express'
import { IAppRole } from 'src/modules/users/enums/app-role'

declare module 'express' {
  export interface IRequestUser {
    id: string
    appRole: IAppRole
  }

  interface Request {
    user: IRequestUser
  }
}
