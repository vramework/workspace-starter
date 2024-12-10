import { addChannel } from '@vramework/core/channel'
import { onConnect, onMessage, onDisconnect, subscribe, unsubscribe, emit } from './events.functions.js'

addChannel({
    channel: '/event',
    onConnect,
    onDisconnect,
    onMessage,
    onMessageRoute: {
        action: {
            subscribe: {
                func: subscribe
            },
            unsubscribe,
            emit
        }
    },
    auth: false,
    docs: {
        description: 'A channel route',
        response: 'A message',
        errors: [],
        tags: ['channel'],
    },
})
