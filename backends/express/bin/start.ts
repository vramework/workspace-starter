import { VrameworkExpressServer } from '@vramework/express'
// import { TimerTaskScheduler } from '@vramework/schedule'

import { createConfig } from '@todos/functions/src/config.js'
import { createSingletonServices, createSessionServices } from '@todos/functions/src/services.js'

import '@todos/functions/.vramework/vramework-bootstrap.js'

async function main(): Promise<void> {
  try {
    const config = await createConfig()
    const singletonServices = await createSingletonServices(config)

    // const scheduler = new TimerTaskScheduler(singletonServices, createSessionServices)
    // scheduler.scheduleAllTasks()
    
    const appServer = new VrameworkExpressServer(
      config as any,
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

main()