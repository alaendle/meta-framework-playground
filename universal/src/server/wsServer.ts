import { applyWSSHandler } from '@trpc/server/adapters/ws';
import * as ws from 'ws';
import { appRouter } from './router';

const globalAny = global as any;
globalAny.WebSocket = ws;

export const startWsServer = () => {
const wss = new ws.WebSocketServer({
  port: 3001,
});
const handler = applyWSSHandler({ wss, router: appRouter });
wss.on('connection', (ws) => {
  console.log(`➕➕ Connection (${wss.clients.size})`);
  ws.once('close', () => {
    console.log(`➖➖ Connection (${wss.clients.size})`);
  });
});
console.log('✅ WebSocket Server listening on ws://localhost:3001');
process.on('SIGTERM', () => {
  console.log('SIGTERM');
  handler.broadcastReconnectNotification();
  wss.close();
});
}