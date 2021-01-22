import { Category as PrismaCategory } from '@prisma/client'
import { Exclude } from 'class-transformer'

export class Category implements PrismaCategory {
  id: string
  name: string
  icon: string

  @Exclude()
  userId: string

  createdAt: Date
  updatedAt: Date
}
