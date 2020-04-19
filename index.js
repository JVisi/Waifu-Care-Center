const express=require('express');
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

b349bdc1-c752-4520-cbb2-9c1f77g44f7c
c144bdb2-c752-4520-cbc1-9c1f77g64f7b waifu id


}
tokenshit("asd");
*/
const port= process.env.port || 3000;
const app=express();

/*const {sequelize}=require('./lib/ORM/setting');
const {Activity}=require('./lib/ORM/Models/activity');
const {Weapon}=require('./lib/ORM/Models/weapon');
const {Item}=require('./lib/ORM/Models/item');
const {Harem_Skill}=require('./lib/ORM/Models/harem_skill');
const {SpecialSkill}=require('./lib/ORM/Models/specialSkill');
sequelize.sync({alter:true});*/

app.use(bodyparser.json())

app.use(router);
app.listen(port,()=>{
    console.info(`app listen on ${port}`);
});