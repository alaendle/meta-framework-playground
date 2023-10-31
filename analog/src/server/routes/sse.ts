import { defineEventHandler } from 'h3'

interface Clock {
  readonly time: string;
}

export default defineEventHandler((event) => {
    const { req, res } = event.node

    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
      };
    res.writeHead(200, headers);

    let intervalID = setInterval(() => {
        let data : Clock = { time: new Date().toISOString() }
        res.write(`data: ${JSON.stringify(data)}\n\n`);
        console.log(`Data send: ${JSON.stringify(data)}`);
      }, 1000);
    
    req.on('close', () => {
      console.log(`Connection closed`);
      clearInterval(intervalID);
      res.end();
    });
})
