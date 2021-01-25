import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/shared/prisma/prisma.service'

import { CreateInvoiceDto } from '../dtos/create-invoice.dto'
import { UpdateInvoiceDto } from '../dtos/update-invoice.dto'
import { Invoice } from '../entities/invoice.entity'

@Injectable()
export class InvoicesRepository {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: CreateInvoiceDto): Promise<Invoice> {
    const invoice = await this.prisma.invoice.create({
      data: { ...data, user: { connect: { id: userId } } },
    })

    return invoice
  }

  async findById(id: string): Promise<Invoice | null> {
    const invoice = await this.prisma.invoice.findFirst({ where: { id } })

    return invoice
  }

  async findAllByUserId(
    userId: string,
    query?: Prisma.InvoiceWhereInput,
    orderBy?: Prisma.InvoiceOrderByInput
  ): Promise<Invoice[]> {
    const invoices = await this.prisma.invoice.findMany({
      where: { ...query, userId },
      orderBy: { updatedAt: 'desc', ...orderBy },
    })

    return invoices
  }

  async update(id: string, data: UpdateInvoiceDto): Promise<Invoice> {
    const invoice = await this.prisma.invoice.update({ data, where: { id } })

    return invoice
  }

  async delete(id: string): Promise<void> {
    await this.prisma.transaction.deleteMany({ where: { invoiceId: id } })

    await this.prisma.invoice.delete({ where: { id } })
  }
}
