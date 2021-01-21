import { User as UserDB } from '@prisma/client'
import { Exclude } from 'class-transformer'

import { IAppRole } from '../enums/AppRole'

export class User implements UserDB {
  id: string
  name: string
  email: string

  @Exclude()
  appRole: IAppRole

  @Exclude()
  password: string

  createdAt: Date
  updatedAt: Date
}
