import { addScheduledTask } from '@vramework/core'
import { expireTodos } from './todo.functions'

addScheduledTask({
    title: 'expireTodos',
    schedule: '0 0 0 * * *',
    func: expireTodos,
    docs: {
        tags: ['todos']
    }
})