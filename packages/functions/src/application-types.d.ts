import type {
  CoreServices,
  CoreServerConfig,
  CoreSingletonServices,
  CoreUserSession,
  LogLevel,
  SecretService
} from '@pikku/core'
import type { SQLConfig } from '@pikku-workspace-starter/functions/src/services/kysely'
import type { DB } from 'kysely-codegen'
import type { Kysely } from 'kysely'
import type { JoseJWTService } from '@pikku/jose'

export interface UserSession extends CoreUserSession {
  userId: string
}

export interface Config extends CoreServerConfig {
  awsRegion: string
  port: number
  hostname: string
  logLevel: LogLevel
  sql: SQLConfig
  secrets: {
    postgresCredentials: string
  }
  apiKeys: string[]
}

export type SingletonServices = CoreSingletonServices & {
  jwt: JoseJWTService<UserSession>
  kysely: Kysely<DB>
  subscriptionService?: SubscriptionService
  secretServce?: SecretService
}

export interface Services extends CoreServices<SingletonServices> {
  
}
