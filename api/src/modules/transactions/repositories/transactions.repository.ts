import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { lastDayOfMonth } from 'date-fns'
import { PrismaService } from 'src/shared/prisma/prisma.service'

import { CreateTransactionDto } from '../dtos/create-transaction.dto'
import { FindInvoiceBalanceDto } from '../dtos/find-invoice-balance.dto'
import { UpdateTransactionDto } from '../dtos/update-transaction.dto'
import { Balance } from '../entities/balance.entity'
import { Transaction } from '../entities/transaction.entity'

@Injectable()
export class TransactionRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    userId: string,
    data: CreateTransactionDto
  ): Promise<Transaction> {
    const transaction = await this.prisma.transaction.create({
      data: { ...data, userId },
      include: { category: { select: { id: true, name: true, icon: true } } },
    })

    return transaction
  }

  async findById(id: string): Promise<Transaction | null> {
    const transaction = await this.prisma.transaction.findFirst({
      where: { id },
      include: { category: { select: { id: true, name: true, icon: true } } },
    })

    return transaction
  }

  async findAllByUserId(
    userId: string,
    where?: Prisma.TransactionWhereInput
  ): Promise<Transaction[]> {
    const transactions = await this.prisma.transaction.findMany({
      where: { fixed: false, repeatTimes: 0, from: null, ...where, userId },
      orderBy: { paymentDate: 'desc' },
      include: { category: { select: { id: true, name: true, icon: true } } },
    })

    return transactions
  }

  async update(id: string, data: UpdateTransactionDto): Promise<Transaction> {
    const transaction = await this.prisma.transaction.update({
      data,
      where: { id },
      include: { category: { select: { id: true, name: true, icon: true } } },
    })

    return transaction
  }

  async delete(id: string): Promise<void> {
    await this.prisma.transaction.delete({ where: { id } })
  }

  async findAllByInvoiceMonth(
    userId: string,
    { invoiceId, month, year }: FindInvoiceBalanceDto
  ): Promise<Transaction[]> {
    const date = new Date(Number(year), Number(month) - 1, 1)

    const transactions = await this.prisma.transaction.findMany({
      where: {
        fixed: false,
        repeatTimes: 0,
        from: null,
        userId,
        invoiceId,
        paymentDate: {
          lte: lastDayOfMonth(date),
          gte: date,
        },
      },
    })

    return transactions
  }

  async findInvoiceMonthBalance(
    userId: string,
    { invoiceId, month, year }: FindInvoiceBalanceDto
  ): Promise<Balance> {
    const lastMonth = new Date(Number(year), Number(month) - 1, 0)

    const pastTransactions = await this.prisma.transaction.findMany({
      where: {
        fixed: false,
        repeatTimes: 0,
        from: null,
        userId,
        invoiceId,
        paymentDate: {
          lte: lastMonth,
        },
      },
    })
    const pastIncome = pastTransactions.reduce((prev, curr) => {
      if (curr.type === 'INCOME') {
        return prev + curr.amount
      } else if (curr.type === 'OUTCOME') {
        return prev - curr.amount
      }
      return prev
    }, 0)

    const transactions = await this.prisma.transaction.findMany({
      where: {
        fixed: false,
        repeatTimes: 0,
        from: null,
        userId,
        invoiceId,
        paymentDate: {
          gt: lastMonth,
        },
      },
    })

    const income =
      pastIncome +
      transactions.reduce((prev, curr) => {
        if (curr.type === 'INCOME') {
          return prev + curr.amount
        }
        return prev
      }, 0)
    const outcome = transactions.reduce((prev, curr) => {
      if (curr.type === 'OUTCOME') {
        return prev + curr.amount
      }
      return prev
    }, 0)

    return {
      income,
      outcome,
      total: income - outcome,
    }
  }
}
