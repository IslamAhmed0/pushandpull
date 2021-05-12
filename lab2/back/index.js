const express= require('express')
const cors= require('cors');
const port=process.env.Port||3001;
const app=express();
app.use(express.json());
app.use(cors());

// view engine setup
const subscribers ={};

//call server server hangs
app.get('/messages/subscribe', ((req, res, next) => {
    const id= Math.ceil(Math.random()*100)
    subscribers[id]=res;
}))



app.post('/messages', (req, res, next)=>{
    console.log(req.body);
    Object.entries(subscribers).forEach(([id,response])=>{
     response.json(req.body);
     delete subscribers[id]
    });
    res.status(200).end();
})

app.listen(port,()=>{
    console.log(`server running on port:${port}`)
})
