import { IInvoiceType } from '../enums/invoice-type'

export class CreateInvoiceDto {
  type: IInvoiceType
  name?: string
  icon?: string
  creditDueDay?: number
}
