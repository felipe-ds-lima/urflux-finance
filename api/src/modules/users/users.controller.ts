import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Put,
  Param,
} from '@nestjs/common'
import { plainToClass } from 'class-transformer'

import { AppRoles } from '../auth/decorators/app-roles.decorator'
import { AppRolesGuard } from '../auth/guards/app-roles.guard'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { CreateUserDto } from './dtos/create-user.dto'
import { UpdateUserDto } from './dtos/update-user.dto'
import { User } from './entities/user.entity'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto)

    return plainToClass(User, user)
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, AppRolesGuard)
  @AppRoles('ADMIN')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(
      id,
      updateUserDto,
      updateUserDto.appRole
    )

    return plainToClass(User, user)
  }

  @Get()
  @UseGuards(JwtAuthGuard, AppRolesGuard)
  @AppRoles('ADMIN')
  async findAll() {
    const users = await this.usersService.findAll()

    return plainToClass(User, users)
  }
}
