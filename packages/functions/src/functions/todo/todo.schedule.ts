import { addScheduledTask } from '@pikku/core'
import { expireTodos } from './todo.functions.js'

addScheduledTask({
  name: 'expireTodos',
  schedule: '* * * * 1',
  func: expireTodos,
  docs: {
    tags: ['todos'],
  },
})
