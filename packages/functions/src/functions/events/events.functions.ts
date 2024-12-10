import { ChannelConnection, ChannelDisconnection, ChannelMessage } from '../../../.vramework/vramework-types.js'
import { JustTodoId, Todo } from '@todos/sdk/types/todo.types.js'

export const onConnect: ChannelConnection<'hello!'> = async (services, channel) => {
    services.logger.info('Connected to event channel')
    channel.send('hello!')
}

export const onDisconnect: ChannelDisconnection = async (services, channel) => {
    services.logger.info('Disconnected from event channel')
}

export const subscribe: ChannelMessage<{ name: string }, { action: 'subscribe', data: string }> = async (services, channel, data) => {
    console.log('subscribing')
    const interval = setInterval(() => {
        try {
            console.log('sending', data),
            channel.send({
                action: 'subscribe',
                data: `${data.name}: ${Math.random()}`
            })
        } catch (e) {
            // Channel is closed
            clearInterval(interval)
        }
    }, 1000)
}

export const unsubscribe: ChannelMessage<{ name: string }> = async (services, channel, data) => {
    console.log('got an unsubscribe message', data)
}

export const emit: ChannelMessage<unknown, { timestamp: string }> = async (services, channel, data) => {
}

export const onMessage: ChannelMessage<'hello', 'hey'> = async (services, channel) => {
    channel.send('hey')
}
