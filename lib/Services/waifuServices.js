const {Waifu} = require('../ORM/Models/waifu');
const {generateId,ErrorMessages}=require('../config');

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
                }
            }).then((result)=>{
                if(result!=null){
                    resolve(result);
                }
                else reject();
            },()=>{
                reject();
            });
        });
    }
}

module.exports={
    WaifuService:WaifuService
}