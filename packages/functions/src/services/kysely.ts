import type {
  Logger,
  SecretService,
  VariablesService,
} from '@pikku/core/services'
import { CamelCasePlugin, Kysely } from 'kysely'
import { DB } from 'kysely-codegen'
import { PostgresJSDialect } from 'kysely-postgres-js'
import postgres from 'postgres'

export interface SQLConfig {
  ssl?: {
    rejectUnauthorized: boolean
    ca: string
  }
}

export class KyselyDB {
  public kysely: Kysely<DB>
  private postgres: postgres.Sql<{}>

  constructor(
    private poolConfig: any,
    private logger: Logger
  ) {
    delete poolConfig.ssl
    this.postgres = postgres(poolConfig)
    this.kysely = new Kysely<DB>({
      dialect: new PostgresJSDialect({
        postgres: this.postgres,
      }),
      plugins: [new CamelCasePlugin()],
    })
    this.kysely = this.kysely.withSchema('app')
  }

  public async init() {
    this.logger.info(
      `Connecting to database: ${this.poolConfig.host}:${this.poolConfig.port} with name ${this.poolConfig.database}`
    )
    try {
      const response = await this.postgres`SELECT version();`
      this.logger.info(response[0].version)
    } catch (error) {
      this.logger.error('Error connecting to database', error)
      process.exit(1)
    }
  }
}

export const getDatabaseConfig = async (
  variablesService: VariablesService,
  secrets: SecretService,
  postgresSecret: string,
  sqlConfig: SQLConfig
) => {
  if (variablesService.get('NODE_ENV') === 'production') {
    const config = await secrets.getSecretJSON<any>(postgresSecret)
    return {
      ...config,
      ssl: sqlConfig.ssl,
      user: config.username || config.user,
      database: config.database || config.dbname,
    }
  } else {
    return {
      host: '0.0.0.0',
      port: 5432,
      user: 'postgres',
      password: 'password',
      database: 'pikku_workspace_starter',
    }
  }
}
