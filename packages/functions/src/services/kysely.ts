import type { Logger, SecretService } from '@vramework/core/services'
import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely'
import { DB } from 'kysely-codegen'
import pg from 'pg'

export interface SQLConfig {
  directory: string
  ssl?: {
    rejectUnauthorized: boolean
    ca: string
  }
}

export class KyselyDB {
  public kysely: Kysely<DB>
  public pool: pg.Pool

  constructor(poolConfig: pg.PoolConfig, private logger: Logger) {
    this.pool = new pg.Pool(poolConfig)
    this.kysely = new Kysely<DB>({
      dialect: new PostgresDialect({
        pool: this.pool,
      }),
      plugins: [new CamelCasePlugin()],
    })
  }

  public async init () {
    const response = await this.pool.query('SELECT version();')
    this.logger.info(response.rows[0].version)
  }
}

export const getDatabaseConfig = async (
  secrets: SecretService,
  postgresSecret: string,
  sqlConfig: SQLConfig
) => {
  if (process.env.NODE_ENV === 'production') {
    const config = await secrets.getSecretJSON(postgresSecret)
    return {
      ...config,
      ssl: sqlConfig.ssl,
    }
  } else {
    return {
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: 'password',
      database: 'todos',
    }
  }
}
