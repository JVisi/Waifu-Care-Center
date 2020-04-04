const express=require('express');
const cors=require('cors');

const port= process.env.port || 3000;
const app=express();
app.use(cors);

app.listen(port,()=>{
    console.info(`app listen on ${port}`)
});