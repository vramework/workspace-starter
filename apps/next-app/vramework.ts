import { VrameworkNextJS } from '@vramework/deploy-next'

import '@todos/functions/generated/routes'
import '@todos/functions/generated/schemas'

import { config } from '@todos/functions/src/config'
import { createSingletonServices } from '@todos/functions/src/services'
import { CreateSessionServices } from '@vramework/core'

const createSessionServices: CreateSessionServices = async (
  singletonServices,
  _session
) => {
  return {
    ...singletonServices,
  }
}

let _vramework: VrameworkNextJS | undefined

export const vramework = () => {
  if (_vramework) {
    return _vramework
  }
  _vramework = new VrameworkNextJS(
    config,
    createSingletonServices as any,
    createSessionServices
  )
  return _vramework
}

vramework().actionRequest({
  method: 'get',
  route: '/api/bob',
  hello: 2
}, { bob: 1})
