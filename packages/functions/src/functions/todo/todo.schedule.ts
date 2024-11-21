import { addScheduledTask } from '@vramework/core'
import { expireTodos } from './todo.functions.js'

addScheduledTask({
    title: 'expireTodos',
    schedule: '* * * * *',
    func: expireTodos,
    docs: {
        tags: ['todos']
    }
})