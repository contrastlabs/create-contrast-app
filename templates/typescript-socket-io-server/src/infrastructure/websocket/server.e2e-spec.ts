import type { Socket as SocketServer } from 'socket.io'
import ioc, { type Socket as ClientSocket } from 'socket.io-client'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { WebSocketEvents, io } from './server'

describe('Websocket Server', () => {
  let serverSocket: SocketServer
  let clientSocket: ClientSocket

  beforeAll(() => {
    return new Promise((resolve) => {
      const port = Math.floor(Math.random() * 1000) + 3000

      io.listen(port)

      clientSocket = ioc(`http://localhost:${port}`)

      io.on(WebSocketEvents.CONNECTION, (socket) => {
        serverSocket = socket
      })

      clientSocket.on('connect', resolve)
    })
  })

  afterAll(() => {
    io.close()

    clientSocket.disconnect()
  })

  it('should work', () => {
    return new Promise<void>((resolve) => {
      clientSocket.on(WebSocketEvents.PING, (message: string) => {
        expect(message).toEqual('pong')

        resolve()
      })

      serverSocket.emit(WebSocketEvents.PING, 'pong')
    })
  })

  it('should work with an acknowledgement', () => {
    return new Promise<void>((resolve) => {
      serverSocket.on(WebSocketEvents.PING, (reply) => {
        reply('pong')
      })

      clientSocket.emit(WebSocketEvents.PING, (message: string) => {
        expect(message).toBe('pong')

        resolve()
      })
    })
  })

  it('should work with emitWithAck()', async () => {
    serverSocket.on(WebSocketEvents.PING, (reply) => {
      reply('pong')
    })

    const message = await clientSocket.emitWithAck(WebSocketEvents.PING)

    expect(message).toEqual('pong')
  })
})
