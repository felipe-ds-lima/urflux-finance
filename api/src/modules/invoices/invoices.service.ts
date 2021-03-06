import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'

import { CreateInvoiceDto } from './dtos/create-invoice.dto'
import { UpdateInvoiceDto } from './dtos/update-invoice.dto'
import { Invoice } from './entities/invoice.entity'
import { InvoicesRepository } from './repositories/invoices.repository'

@Injectable()
export class InvoicesService {
  constructor(private invoicesRepository: InvoicesRepository) {}

  async create(
    userId: string,
    createInvoiceDto: CreateInvoiceDto
  ): Promise<Invoice> {
    if (!createInvoiceDto.name) {
      if (createInvoiceDto.type === 'ACCOUNT') {
        const accounts = await this.invoicesRepository.findAllByUserId(userId, {
          name: { startsWith: 'Conta' },
        })

        const currentNumber = accounts.reduce((prev, curr) => {
          const currNumber = Number(curr.name.replace(/\D/g, ''))
          if (currNumber > prev) {
            return currNumber
          }
          return prev
        }, 0)

        if (currentNumber >= 0) {
          createInvoiceDto.name = `Conta ${currentNumber + 1}`
        }
      } else if (createInvoiceDto.type === 'CREDIT') {
        const credits = await this.invoicesRepository.findAllByUserId(userId, {
          name: { startsWith: 'Crédito' },
        })

        const currentNumber = credits.reduce((prev, curr) => {
          const currNumber = Number(curr.name.replace(/\D/g, ''))
          if (currNumber > prev) {
            return currNumber
          }
          return prev
        }, 0)

        if (currentNumber >= 0) {
          createInvoiceDto.name = `Crédito ${currentNumber + 1}`
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

  async findOne(userId: string, id: string): Promise<Invoice> {
    const invoice = await this.invoicesRepository.findById(id)

    if (!invoice || invoice?.userId !== userId) {
      throw new NotFoundException()
    }

    return invoice
  }

  async findAll(userId: string): Promise<Invoice[]> {
    const invoices = await this.invoicesRepository.findAllByUserId(userId)

    return invoices
  }

  async update(
    userId: string,
    id: string,
    updateInvoiceDto: UpdateInvoiceDto
  ): Promise<Invoice> {
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

  async remove(userId: string, id: string): Promise<void> {
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
