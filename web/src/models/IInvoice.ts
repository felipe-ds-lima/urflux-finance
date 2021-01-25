export interface IInvoice {
  id: string
  type: string
  icon: string
  name: string
  creditDueDay: number | null
  createdAt: string | Date
  updatedAt: string | Date
}
