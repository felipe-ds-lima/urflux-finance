import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'

import { CreateInvoiceDto } from './dtos/create-invoice.dto'
import { UpdateInvoiceDto } from './dtos/update-invoice.dto'
import { InvoicesRepository } from './repositories/invoices.repository'

@Injectable()
export class InvoicesService {
  constructor(private invoicesRepository: InvoicesRepository) {}

  async create(userId: string, createInvoiceDto: CreateInvoiceDto) {
    if (!createInvoiceDto.name) {
      if (createInvoiceDto.type === 'ACCOUNT') {
        const accounts = await this.invoicesRepository.findAllByUserId(userId, {
          name: { startsWith: 'Conta' },
        })

        if (accounts.length >= 0) {
          createInvoiceDto.name = `Conta ${accounts.length + 1}`
        }
      } else if (createInvoiceDto.type === 'CREDIT') {
        const credits = await this.invoicesRepository.findAllByUserId(userId, {
          name: { startsWith: 'Crédito' },
        })

        if (credits.length >= 0) {
          createInvoiceDto.name = `Crédito ${credits.length + 1}`
        }
      }
    }

    if (createInvoiceDto.type === 'CREDIT') {
      if (
        !createInvoiceDto.creditDueDay ||
        createInvoiceDto.creditDueDay < 1 ||
        createInvoiceDto.creditDueDay > 31
      ) {
        throw new BadRequestException('Invalid due day.')
      }
    }

    try {
      const invoice = await this.invoicesRepository.create(
        userId,
        createInvoiceDto
      )

      return invoice
    } catch {
      throw new InternalServerErrorException()
    }
  }

  async findAll(userId: string) {
    const invoices = await this.invoicesRepository.findAllByUserId(userId)

    return invoices
  }

  async update(userId: string, id: string, updateInvoiceDto: UpdateInvoiceDto) {
    const invoice = await this.invoicesRepository.findById(id)

    if (!invoice || invoice?.userId !== userId) {
      throw new NotFoundException()
    }

    try {
      const updatedInvoice = await this.invoicesRepository.update(
        id,
        updateInvoiceDto
      )

      return updatedInvoice
    } catch {
      throw new InternalServerErrorException()
    }
  }

  async remove(userId: string, id: string) {
    const invoice = await this.invoicesRepository.findById(id)

    if (!invoice || invoice?.userId !== userId) {
      throw new NotFoundException()
    }

    try {
      await this.invoicesRepository.delete(id)
    } catch {
      throw new InternalServerErrorException()
    }
  }
}
