import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/shared/prisma/prisma.module'

import { TransactionRepository } from './repositories/transactions.repository'
import { TransactionsController } from './transactions.controller'
import { TransactionsService } from './transactions.service'

@Module({
  imports: [PrismaModule],
  controllers: [TransactionsController],
  providers: [TransactionsService, TransactionRepository],
})
export class TransactionsModule {}
