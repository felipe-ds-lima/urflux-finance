import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/shared/prisma/prisma.service'

import { CreateTransactionDto } from '../dtos/create-transaction.dto'
import { UpdateTransactionDto } from '../dtos/update-transaction.dto'
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

  async findAllByUserId(userId: string): Promise<Transaction[]> {
    const transactions = await this.prisma.transaction.findMany({
      where: { userId, fixed: false, repeatTimes: 0, from: null },
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
}
