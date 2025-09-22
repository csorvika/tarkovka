import { PrismaClient } from '@prisma/client'

declare global {
  // allow global __db to avoid multiple instances in dev
  // eslint-disable-next-line no-var
  var __db: PrismaClient | undefined
}

const client = global.__db ?? new PrismaClient()

if (process.env.NODE_ENV === 'development') global.__db = client

export default client
