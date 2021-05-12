const express= require('express')
const cors= require('cors');
const port=process.env.Port||3001;
const app=express();
app.use(express.json());
app.use(cors());
const socket = require('socket.io');


const messages = [];
const responses = {}




app.get('/subscribe',(req,res)=>{
    const id = Math.floor(Math.random() * 100000000);
    req.on('close',()=>{
        delete responses[id]
    })
    res.writeHead(200,{
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    })
    res.write('\n');
    responses[id] = res

})

app.post('/messagesSubscribe',(req,res)=>{
    const {body} = req;
    body.id = Date.now()
    messages.push(body);
    Object.keys(responses).forEach((subId) => {
        responses[subId].write(`data: ${JSON.stringify(body)}\n\n`)
        // delete responses[subId]
    })
    res.status(200).end();
})








app.listen(port,()=>{
    console.log(`server running on port:${port}`)
})
