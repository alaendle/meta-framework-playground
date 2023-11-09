import { Server } from 'socket.io';

const defineNitroPlugin = ((_nitroApp: any) => {
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
        socket.on('error', (msg) => {
            console.log('socket error', msg)
        })

        socket.on('disconnecting', () => {
            // put code here..
        })

        socket.on('messageFromClient', () => {
           // put code here etc.
        })
    })
})

export default defineNitroPlugin