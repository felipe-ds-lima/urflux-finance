import { Transaction as PrismaTransaction } from '@prisma/client'
import { Exclude } from 'class-transformer'
import { Category } from 'src/modules/categories/entities/category.entity'

import { ITransactionType } from '../enums/transaction-type'

export class Transaction implements PrismaTransaction {
  id: string
  type: ITransactionType
  description: string
  note: string | null
  fixed: boolean
  repeatTimes: number
  paymentDate: Date
  payed: boolean
  amount: number
  from: string | null
  category?: {
    id: string
    name: string
    icon: string
  }

  @Exclude()
  categoryId: string | null

  @Exclude()
  userId: string

  @Exclude()
  invoiceId: string

  createdAt: Date
  updatedAt: Date
}
