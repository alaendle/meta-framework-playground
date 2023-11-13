import { Server } from 'socket.io';

interface Clock {
  readonly time: string;
}
  
const defineNitroPlugin = ((_nitroApp: unknown) => {
    console.log("SOCKET.IO PLUGIN")
    //console.log(_nitroApp);
    const port = process.env.SOCKET_IO_PORT || 3010
    const io = new Server(Number(port), {
        serveClient: false,
        cors: {
            origin: '*'
        }
    })

    io.engine.on('connection_error', (err) => {
        console.log('socket.io connection error', err)
    })

    io.on('connect', (socket) => {
        const intervalID = setInterval(() => {
            const data : Clock = { time: new Date().toISOString() }
            socket.emit(`data`, data, (res: unknown) => console.log(`Data send: ${JSON.stringify(data)} with result: ${res}`));
          }, 1000);
        
        socket.on('disconnect', (reason) => {
            console.log(`Disconnect socket: ${reason}`);
            clearInterval(intervalID);
        })
    })
})

export default defineNitroPlugin