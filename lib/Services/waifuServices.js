const {Waifu} = require('../ORM/Models/waifu');
const {generateId,ErrorMessages}=require('../config');
const { config } = require('dotenv');
const { Anime } = require('../ORM/Models/anime');

class WaifuService{
    static getAllWaifu=()=>{
        return new Promise((resolve,reject)=>{
            Waifu.findAll().then((waifuObjects)=>{resolve(waifuObjects)},
            (err)=>{
                console.error(err);
                reject(ErrorMessages.UNKNOWN_ERROR);
            });
        });
    }
    static doesWaifuExist(waifuId){
        return new Promise((resolve,reject)=>{
            Waifu.findOne({
                where:{
                    Id:waifuId
                },
                include:Anime
            }).then((result)=>{
                if(result!=null){
                    resolve(result);
                }
                else reject();
            },(err)=>{
                reject(err);
            });
        });
    }
    
    static createWaifu(waifu){
        return new Promise((resolve,reject)=>{
            Waifu.findOne({
                where:{
                    name:waifu.name
                }
            }).then((result)=>{
                if(result!=null){
                    reject();
                }
                else{
                    generateId().then(Id=>{
                        console.log(Id)
                        Waifu.create({
                            Id:Id,
                            name:waifu.name,
                            power:waifu.power,
                            intelligence:waifu.intelligence,
                            health:waifu.health,
                            armor:waifu.armor,
                            age:waifu.age,
                            kawaiiness:waifu.kawaiiness,
                            type:waifu.type,
                            price:waifu.price,
                            canBattle:waifu.canBattle,
                            image:waifu.image,
                            animeId:waifu.animeId
                        }).then(waifu=>{
                            resolve(waifu)
                        },(err)=>{
                            console.log(err)
                            reject(err)
                        })
                    })
                }
            },(err)=>{
                console.log(err)
                reject(err);
            });
        })
        
    }
}

module.exports={
    WaifuService:WaifuService
}