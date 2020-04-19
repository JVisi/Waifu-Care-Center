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
}

module.exports={
    WaifuService:WaifuService
}