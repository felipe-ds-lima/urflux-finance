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
import { CategoriesService } from './categories.service'
import { CreateCategoryDto } from './dtos/create-category.dto'
import { UpdateCategoryDto } from './dtos/update-category.dto'
import { Category } from './entities/category.entity'

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Req() request: Request,
    @Body() createCategoryDto: CreateCategoryDto
  ) {
    const category = await this.categoriesService.create(
      request.user.id,
      createCategoryDto
    )

    return plainToClass(Category, category)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Req() request: Request) {
    const categories = await this.categoriesService.findAll(request.user.id)

    return plainToClass(Category, categories)
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string, @Req() request: Request) {
    const category = await this.categoriesService.findOne(request.user.id, id)

    return plainToClass(Category, category)
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Req() request: Request,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    const category = await this.categoriesService.update(
      request.user.id,
      id,
      updateCategoryDto
    )

    return plainToClass(Category, category)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Req() request: Request) {
    await this.categoriesService.remove(request.user.id, id)
  }
}
