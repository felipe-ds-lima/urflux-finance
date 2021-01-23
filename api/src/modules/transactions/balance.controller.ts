import { Request } from 'express'

import { Controller, Get, UseGuards, Req, Query } from '@nestjs/common'
import { plainToClass } from 'class-transformer'

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { FindInvoiceBalanceDto } from './dtos/find-invoice-balance.dto'
import { Transaction } from './entities/transaction.entity'
import { TransactionsService } from './transactions.service'

@Controller('balance')
export class BalanceController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findInvoiceBalance(
    @Req() request: Request,
    @Query() query: FindInvoiceBalanceDto
  ) {
    const balance = await this.transactionsService.findInvoiceBalance(
      request.user.id,
      query
    )

    return {
      transactions: plainToClass(Transaction, balance.transactions),
      balance: balance.balance,
    }
  }
}
