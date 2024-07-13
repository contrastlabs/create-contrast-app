import { Server } from 'socket.io'

import { environment } from '@/config'
import { Logger } from '@/core/utils'

enum WebSocketEvents {
  CONNECTION = 'connection',
  DISCONNECT = 'disconnect',
  PING = 'ping',
}

const logger = Logger.from('WebSocket')

const io = new Server({
  cors: {
    origin: '*',
  },
})

io.on(WebSocketEvents.CONNECTION, (socket) => {
  logger.info(`Socket connected | ${socket.id}`)

  socket.on(WebSocketEvents.DISCONNECT, () => {
    logger.info(`Socket disconnected | ${socket.id}`)
  })
})

async function startWebSocketServer(): Promise<void> {
  io.listen(environment.WEBSOCKET_SERVER_PORT)

  logger.success(
    `Server running in port "${environment.WEBSOCKET_SERVER_PORT}".`,
  )
}

export { WebSocketEvents, logger, io, startWebSocketServer }
