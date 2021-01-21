import { User as PrismaUser } from '@prisma/client'
import { Exclude } from 'class-transformer'

import { IAppRole } from '../enums/app-role'

export class User implements PrismaUser {
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
