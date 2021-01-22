import { Request } from 'express'

import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common'
import { plainToClass } from 'class-transformer'

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { CreateTransactionDto } from './dtos/create-transaction.dto'
import { UpdateTransactionDto } from './dtos/update-transaction.dto'
import { Transaction } from './entities/transaction.entity'
import { TransactionsService } from './transactions.service'

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Req() request: Request,
    @Body() createTransactionDto: CreateTransactionDto
  ) {
    const transaction = await this.transactionsService.create(
      request.user.id,
      createTransactionDto
    )

    return plainToClass(Transaction, transaction)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Req() request: Request) {
    const transactions = await this.transactionsService.findAll(request.user.id)

    return plainToClass(Transaction, transactions)
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Req() request: Request, @Param('id') id: string) {
    const transaction = await this.transactionsService.findOne(
      request.user.id,
      id
    )

    return plainToClass(Transaction, transaction)
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Req() request: Request,
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto
  ) {
    const transaction = await this.transactionsService.update(
      request.user.id,
      id,
      updateTransactionDto
    )

    return plainToClass(Transaction, transaction)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Req() request: Request, @Param('id') id: string) {
    await this.transactionsService.remove(request.user.id, id)
  }
}
