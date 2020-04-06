const express=require('express');
const cors=require('cors');
const bodyparser=require('body-parser');
const {router}=require('./lib/router');

/*
const config=require('./lib/config');
async function tokenshit(heli){
    let token=await config.signToken(heli);
    config.verifyTokenAsync(token).then((value)=>{
        console.log("helo");
    },
    (rejectValue)=>{
        console.log("nem helo");
    });
}
tokenshit("asd");
*/
const port= process.env.port || 3000;
const app=express();
app.use(bodyparser.json())

app.use(router);
app.listen(port,()=>{
    console.info(`app listen on ${port}`);
});