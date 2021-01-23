import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'

import { CreateTransactionDto } from './dtos/create-transaction.dto'
import { FindInvoiceBalanceDto } from './dtos/find-invoice-balance.dto'
import { UpdateTransactionDto } from './dtos/update-transaction.dto'
import { Balance } from './entities/balance.entity'
import { Transaction } from './entities/transaction.entity'
import { TransactionRepository } from './repositories/transactions.repository'

interface IInvoiceBalance {
  transactions: Transaction[]
  balance: Balance
}

@Injectable()
export class TransactionsService {
  constructor(private transactionsRepository: TransactionRepository) {}

  async create(
    userId: string,
    createTransactionDto: CreateTransactionDto
  ): Promise<Transaction> {
    try {
      const transaction = await this.transactionsRepository.create(
        userId,
        createTransactionDto
      )

      return transaction
    } catch {
      throw new InternalServerErrorException()
    }
  }

  async findAll(userId: string): Promise<Transaction[]> {
    const transactions = await this.transactionsRepository.findAllByUserId(
      userId
    )

    return transactions
  }

  async findOne(userId: string, id: string): Promise<Transaction> {
    const transaction = await this.transactionsRepository.findById(id)

    if (!transaction || transaction.userId !== userId) {
      throw new NotFoundException()
    }

    return transaction
  }

  async update(
    userId: string,
    id: string,
    updateTransactionDto: UpdateTransactionDto
  ): Promise<Transaction> {
    const transaction = await this.transactionsRepository.findById(id)

    if (!transaction || transaction.userId !== userId) {
      throw new NotFoundException()
    }

    try {
      const updatedTransaction = await this.transactionsRepository.update(
        id,
        updateTransactionDto
      )

      return updatedTransaction
    } catch {
      throw new InternalServerErrorException()
    }
  }

  async remove(userId: string, id: string): Promise<void> {
    const transaction = await this.transactionsRepository.findById(id)

    if (!transaction || transaction.userId !== userId) {
      throw new NotFoundException()
    }

    try {
      await this.transactionsRepository.delete(id)
    } catch {
      throw new InternalServerErrorException()
    }
  }

  async findInvoiceBalance(
    userId: string,
    findInvoiceBalanceDto: FindInvoiceBalanceDto
  ): Promise<IInvoiceBalance> {
    const transactions = await this.transactionsRepository.findAllByInvoiceMonth(
      userId,
      findInvoiceBalanceDto
    )

    const balance = await this.transactionsRepository.findInvoiceMonthBalance(
      userId,
      findInvoiceBalanceDto
    )

    return { transactions, balance }
  }
}
