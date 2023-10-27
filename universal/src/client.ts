import { createTRPCProxyClient, createWSClient, wsLink } from '@trpc/client';
import { AppRouter } from './server/router';
import ws from 'ws';

const globalAny = global as any;
if (globalAny.WebSocket === undefined) globalAny.WebSocket = ws;

// create persistent WebSocket connection
const wsClient = () => createWSClient({
  url: `ws://localhost:3001`,
});
// configure TRPCClient to use WebSockets transport
export const client = () => createTRPCProxyClient<AppRouter>({
  links: [
    wsLink({
      client: wsClient(),
    }),
  ],
});