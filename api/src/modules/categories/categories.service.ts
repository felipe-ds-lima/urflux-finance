import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'

import { CreateCategoryDto } from './dtos/create-category.dto'
import { UpdateCategoryDto } from './dtos/update-category.dto'
import { Category } from './entities/category.entity'
import { CategoriesRepository } from './repositories/categories.repository'

@Injectable()
export class CategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async create(
    userId: string,
    createCategoryDto: CreateCategoryDto
  ): Promise<Category> {
    if (!createCategoryDto.name) {
      const categories = await this.categoriesRepository.findAllByUserId(
        userId,
        {
          name: { startsWith: 'Nova categoria' },
        }
      )

      const currentNumber = categories.reduce((prev, curr) => {
        const currNumber = Number(curr.name.replace(/\D/g, ''))
        if (currNumber > prev) {
          return currNumber
        }
        return prev
      }, 0)

      if (currentNumber > 0) {
        createCategoryDto.name = `Nova categoria ${currentNumber + 1}`
      }
    }

    try {
      const category = await this.categoriesRepository.create(
        userId,
        createCategoryDto
      )

      return category
    } catch {
      throw new InternalServerErrorException()
    }
  }

  async findAll(userId: string): Promise<Category[]> {
    const categories = await this.categoriesRepository.findAllByUserId(userId)

    return categories
  }

  async findOne(userId: string, id: string): Promise<Category> {
    const category = await this.categoriesRepository.findById(id)

    if (!category || category.userId !== userId) {
      throw new NotFoundException()
    }

    return category
  }

  async update(
    userId: string,
    id: string,
    updateCategoryDto: UpdateCategoryDto
  ): Promise<Category> {
    const category = await this.categoriesRepository.findById(id)

    if (!category || category.userId !== userId) {
      throw new NotFoundException()
    }

    try {
      const udpatedCategory = await this.categoriesRepository.update(
        id,
        updateCategoryDto
      )

      return udpatedCategory
    } catch {
      throw new InternalServerErrorException()
    }
  }

  async remove(userId: string, id: string): Promise<void> {
    const category = await this.categoriesRepository.findById(id)

    if (!category || category.userId !== userId) {
      throw new NotFoundException()
    }

    try {
      await this.categoriesRepository.delete(id)
    } catch {
      throw new InternalServerErrorException()
    }
  }
}
