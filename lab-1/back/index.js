const express= require('express')
const cors= require('cors');
const port=process.env.Port||3001;
const app=express();
app.use(express.json());
app.use(cors());

// view engine setup
const messages = [];

app.post('/messages',(req,res)=>{
    const {body} = req;
    body.id = Date.now()
    messages.push(body);
    res.status(200).end();
})


app.get('/messages',(req,res)=>{
    res.json(messages)
})

app.listen(port,()=>{
    console.log(`server running on port:${port}`)
})
