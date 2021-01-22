import { ITransactionType } from '../enums/transaction-type'

export class CreateTransactionDto {
  type: ITransactionType
  description: string
  paymentDate: Date
  invoiceId: string
  amount: number
  note?: string | null
  fixed?: boolean
  repeatTimes?: number
  payed?: boolean
  categoryId?: string | null
}
