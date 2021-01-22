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
  HttpCode,
} from '@nestjs/common'
import { plainToClass } from 'class-transformer'

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { CreateInvoiceDto } from './dtos/create-invoice.dto'
import { UpdateInvoiceDto } from './dtos/update-invoice.dto'
import { Invoice } from './entities/invoice.entity'
import { InvoicesService } from './invoices.service'

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Req() request: Request,
    @Body() createInvoiceDto: CreateInvoiceDto
  ) {
    const invoice = await this.invoicesService.create(
      request.user.id,
      createInvoiceDto
    )

    return plainToClass(Invoice, invoice)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Req() request: Request) {
    const invoices = await this.invoicesService.findAll(request.user.id)

    return plainToClass(Invoice, invoices)
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Req() request: Request,
    @Body() updateInvoiceDto: UpdateInvoiceDto
  ) {
    const invoice = await this.invoicesService.update(
      request.user.id,
      id,
      updateInvoiceDto
    )
    return plainToClass(Invoice, invoice)
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Req() request: Request) {
    await this.invoicesService.remove(request.user.id, id)
  }
}
