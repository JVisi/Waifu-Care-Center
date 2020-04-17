const {Waifu} = require('../ORM/Models/waifu');
const {generateId,ErrorMessages}=require('../config');

class WaifuService{
    static getAllWaifu=()=>{
        return new Promise((resolve,reject)=>{
            Waifu.findAll().then((waifuObjects)=>{resolve(waifuObjects)},
            (err)=>{
                reject(ErrorMessages.UNKNOWN_ERROR);
            });
        });
    }
}
            //wrap the whole shit in a class and make these static methods

module.exports={
    WaifuService:WaifuService
}