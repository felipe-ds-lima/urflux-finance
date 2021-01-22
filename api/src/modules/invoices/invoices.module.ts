import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/shared/prisma/prisma.module'

import { InvoicesController } from './invoices.controller'
import { InvoicesService } from './invoices.service'
import { InvoicesRepository } from './repositories/invoices.repository'

@Module({
  imports: [PrismaModule],
  controllers: [InvoicesController],
  providers: [InvoicesService, InvoicesRepository],
})
export class InvoicesModule {}
