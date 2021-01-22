import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/shared/prisma/prisma.module'

import { CategoriesController } from './categories.controller'
import { CategoriesService } from './categories.service'
import { CategoriesRepository } from './repositories/categories.repository'

@Module({
  imports: [PrismaModule],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesRepository],
})
export class CategoriesModule {}
