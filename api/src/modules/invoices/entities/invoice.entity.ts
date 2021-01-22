import { Invoice as PrismaInvoice } from '@prisma/client'
import { Exclude } from 'class-transformer'

import { IInvoiceType } from '../enums/invoice-type'

export class Invoice implements PrismaInvoice {
  id: string
  type: IInvoiceType
  name: string
  icon: string

  @Exclude()
  userId: string

  creditDueDay: number | null
  createdAt: Date
  updatedAt: Date
}
