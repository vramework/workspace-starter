import { Command } from 'commander'

import { VrameworkExpressServer } from '@vramework/deploy-express'

import { config } from '@todos/functions/src/config'
import { createSingletonServices, createSessionServices } from '@todos/functions/src/services'
import { getVrameworkCLIConfig } from '@vramework/core/vramework-cli-config'

async function action({ configFile }: { configFile?: string }): Promise<void> {
  try {
    const vrameworkConfig = await getVrameworkCLIConfig(configFile)
    const singletonServices = await createSingletonServices(config)
    const appServer = new VrameworkExpressServer(
      vrameworkConfig,
      config,
      singletonServices,
      createSessionServices
    )
    appServer.enableExitOnSigInt()
    await appServer.init()
    await appServer.start()
  } catch (e: any) {
    console.error(e.toString())
    process.exit(1)
  }
}

export const start = (program: Command): void => {
  program
    .command('start')
    .description('start the express server')
    .option('-c | --config <string>', 'The path to vramework cli config file')
    .action(action)
}
