const express = require('express');
const {json} =require ('body-parser');
const cors =require ("cors");
const {router} =require ('./lib/router.js');
const cookieParser=require('cookie-parser')

const port= process.env.port || 5000;
const app=express();

/* const { sequelize } require './lib/ORM/setting';
const { Activity } require './lib/ORM/Models/activity';
const { Weapon } require './lib/ORM/Models/weapon';
const { Item } require './lib/ORM/Models/item';
const { Harem_Skill } require './lib/ORM/Models/harem_skill';
const { SpecialSkill } require './lib/ORM/Models/specialSkill'; */
//sequelize.sync({alter:true});

//app.use(_json())
app.use(cookieParser())
app.use(json())
app.use(cors({credentials:true,origin:'http://localhost:3000'}))
app.use(router);
app.listen(port,()=>{
    console.info(`app listen on ${port}`);
});
