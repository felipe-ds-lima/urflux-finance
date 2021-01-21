import { NestFactory } from '@nestjs/core'
import { config as envConfig } from 'dotenv'

import { AppModule } from './app.module'

envConfig()

async function bootstrap() {
  const ORIGIN = process.env.ORIGIN || ''
  const PORT = process.env.PORT || 3333

  const origins = ORIGIN.split(',').map(item => item.trim())
  let origin: string | RegExp[]

  if (origins.length > 1) {
    origin = origins.map(item => new RegExp(item))
  } else {
    origin = origins[0] || '*'
  }

  const app = await NestFactory.create(AppModule, { cors: { origin } })
  app.setGlobalPrefix('/api')

  await app.listen(PORT)
}

bootstrap()
