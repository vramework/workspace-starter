import { VrameworkFetch } from '../vramework-fetch'
import { VrameworkWebSocket } from '../vramework-websocket'

const fetch = async () => {
    const vrameworkFetch = new VrameworkFetch({
        serverUrl: 'http://localhost:4002'
    })
    const todos = await vrameworkFetch.api('/todos', 'get', null)
    console.log(`Todos: ${todos.map(todo => todo.name).join(', ')}`)

    const todoViaParam = await vrameworkFetch.api('/todo/:todoId', 'get', { todoId: todos[0].todoId })
    console.log(`Param todo: ${todoViaParam.text}`)

    const todoQuery = await vrameworkFetch.api('/todo', 'get', { todoId: todos[0].todoId})
    console.log(`Query todo: ${todoQuery.text}`)

    // await vrameworkFetch.api('/todo/:todoId', 'delete', { todoId: todos[0].todoId })
}

const websocket = async () => {
    return new Promise(async (resolve) => {
        console.log('Starting websocket')
        const websocket = new VrameworkWebSocket<'/event'>('ws://0.0.0.0:4002/event')
        websocket.ws.onopen = () => {
            console.error('Websocket opened')

            websocket.subscribe((data) => {
                console.log('got message:', data)
            })

            websocket.send('hello')

            const route = websocket.getRoute('action')
            route.subscribe('subscribe', async (data) => {
                console.log(data)
            })
            route.send('subscribe', { name: 'test' })
            
            setTimeout(() => {
                websocket.ws.onclose = resolve
                websocket.ws.close()
            }, 5000)
        }
        websocket.ws.onerror = (e) => {
            console.error('Error with websocket', e)
        }
    })
}

const main = async () => {
    if (process.argv.includes('--websocket')) {
        for (let i = 0; i < 1; i++) {
            await websocket()
            await new Promise((resolve) => setTimeout(resolve, 1000))
        }
    }
    await fetch()
}

main()