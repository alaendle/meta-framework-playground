import { defineEventHandler } from 'h3'

export default defineEventHandler((event) => {
    const { req, res } = event.node

    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
      };
    res.writeHead(200, headers);

    let intervalID = setInterval(() => {
        res.write(`data: { time: "${new Date().toISOString()}" }\n\n`);
        console.log(`Date send!`);
      }, 1000);
    
    req.on('close', () => {
      console.log(`Connection closed`);
      clearInterval(intervalID);
      res.end();
    });
})
