import { NestFactory } from '@nestjs/core'
import { config as envConfig } from 'dotenv'

import { AppModule } from './app.module'

envConfig()

async function bootstrap() {
  const port = process.env.PORT || 3333
  const origin = process.env.ORIGIN.split(',').map(item => item.trim())

  const app = await NestFactory.create(AppModule, { cors: { origin } })
  app.setGlobalPrefix('/api')

  await app.listen(port)
}

bootstrap()
