const express=require('express');
const cors=require('cors');
const squer=require('./lib/ORM/setting').sequelize;


const {Waifu}=require('./lib/ORM/Models/waifu');
const {Anime}=require('./lib/ORM/Models/anime');
const {Harem}=require('./lib/ORM/Models/harem');
Harem.findAll({include:[Waifu]}).then((result)=>{
    console.log(result[0].waifu);
});

const port= process.env.port || 3000;
const app=express();
app.use(cors);

app.listen(port,()=>{
    console.info(`app listen on ${port}`);
});