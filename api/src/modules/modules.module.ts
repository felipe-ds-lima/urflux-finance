import { Module } from '@nestjs/common'

import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { InvoicesModule } from './invoices/invoices.module';
import { CategoriesModule } from './categories/categories.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [UsersModule, AuthModule, InvoicesModule, CategoriesModule, TransactionsModule],
})
export class ModulesModule {}
