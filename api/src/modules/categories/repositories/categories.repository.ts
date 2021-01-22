import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/shared/prisma/prisma.service'

import { CreateCategoryDto } from '../dtos/create-category.dto'
import { UpdateCategoryDto } from '../dtos/update-category.dto'
import { Category } from '../entities/category.entity'

@Injectable()
export class CategoriesRepository {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: CreateCategoryDto): Promise<Category> {
    const category = await this.prisma.category.create({
      data: { ...data, user: { connect: { id: userId } } },
    })

    return category
  }

  async findById(id: string): Promise<Category | null> {
    const category = await this.prisma.category.findFirst({ where: { id } })

    return category
  }

  async findAllByUserId(
    userId: string,
    where?: Prisma.CategoryWhereInput
  ): Promise<Category[]> {
    const categories = await this.prisma.category.findMany({
      where: { ...where, userId },
    })

    return categories
  }

  async update(id: string, data: UpdateCategoryDto): Promise<Category> {
    const category = await this.prisma.category.update({ data, where: { id } })

    return category
  }

  async delete(id: string): Promise<void> {
    await this.prisma.category.delete({ where: { id } })
  }
}
