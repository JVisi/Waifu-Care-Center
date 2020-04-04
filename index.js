const express=require('express');
const cors=require('cors');
const squer=require('./lib/ORM/setting').sequelize;


const {Activity}=require('./lib/ORM/Models/activity');
Activity.findAll().then((result)=>{
    console.log(result[0].dataValues);
});

const port= process.env.port || 3000;
const app=express();
app.use(cors);

app.listen(port,()=>{
    console.info(`app listen on ${port}`)
});