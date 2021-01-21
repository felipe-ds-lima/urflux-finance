import { Module } from '@nestjs/common'

import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { InvoicesModule } from './invoices/invoices.module';

@Module({
  imports: [UsersModule, AuthModule, InvoicesModule],
})
export class ModulesModule {}
