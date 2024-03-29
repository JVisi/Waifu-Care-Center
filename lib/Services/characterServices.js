/// update money, experience | get/set waifus
const {Character}=require('../ORM/Models/character');
const {Waifu}=require('../ORM/Models/waifu');
const {Harem}=require('../ORM/Models/harem');
const {WaifuService}=require('./waifuServices');
const {generateId,ErrorMessages, base64_encode}=require('../config');
const { Anime } = require('../ORM/Models/anime');

class CharacterService{
    static updateMoney=(Id,money)=>{
        return new Promise((resolve,reject)=>{

            Character.update({money:money},{
                where:{
                    Id:Id
                }
            }).then((character)=>{
                resolve();
            },(err)=>{
                reject(ErrorMessages.UNKNOWN_ERROR);
            });
        });
    }
    static getWaifus=(body)=>{
        console.log(body)
        return new Promise((resolve,reject)=>{
            Harem.findAll({
                where:{
                    characterId:body['characterId']
                },
                include:[{model:Waifu, include:[Anime]}]
            }).then((result)=>{
                let values=[];
                result.forEach(element => {
                    base64_encode(element.dataValues.waifu.image).then((encoded)=>{
                        element.dataValues.waifu.image=encoded
                        values.push({"waifu":element.dataValues.waifu});
                    })
                });
                resolve(values);
            },(err)=>{
                console.error(err);
                reject(ErrorMessages.UNKNOWN_ERROR);
            });
        });
    }
    static setWaifu=(body)=>{
        return new Promise((resolve,reject)=>{
            WaifuService.doesWaifuExist(body["waifuId"]).then((waifu)=>{        //got waifu object here
                this.alreadyHasWaifu(body["characterId"],body["waifuId"]).then(()=>{
                    this.doesCharacterExist(body["characterId"]).then((character)=>{         //got characterHere
                        this.updateMoney(body["characterId"],character.money-waifu.price).then(()=>{
                            generateId().then((id)=>{
                                console.log();
                                console.log(waifu.dataValues.Id);
                                Harem.create({
                                    Id:id,
                                    characterId:character.dataValues.Id,
                                    waifuId:waifu.dataValues.Id,
                                    happiness:body["happiness"]==undefined?100:body["happiness"],
                                    tiredness:body["tiredness"]==undefined?0:body["tiredness"],
                                    battleExp:body["battleExp"]==undefined?0:body["battleExp"],
                                }).then((result)=>{
                                    console.log(result);
                                    resolve(result);
                                });
                            });
                        },(err)=>{
                            console.error(err);
                            reject(ErrorMessages.NOT_ENOUGH);
                        });
                    },(err)=>{reject(err)});
                },()=>{reject(ErrorMessages.ALREADY_EXISTS);})
            },()=>{reject(ErrorMessages.MISSING_DATA);})
        });
    }   
    static getCharacterByUserId=(id)=>{     //userId
        return new Promise((resolve,reject)=>{
                Character.findOne({
                    where:{
                        userId:id
                    }
                }).then((result)=>{
                    if(result==null) reject(ErrorMessages.NOT_FIND);
                    else resolve(result);
                },()=>{
                    reject();
                });
        });
    }
    static setCharacter=(userId,body)=>{       //(user)id, (character)name
        console.log(userId)
        return new Promise((resolve,reject)=>{
            this.getCharacterByUserId(userId).then((character)=>{
                    resolve(character)    
                //reject(ErrorMessages.ALREADY_EXISTS);
            },()=>{
                this.isCharacterNameUnique(body["name"]).then(()=>{
                    generateId().then((characterId)=>{
                        Character.create({
                            Id:characterId,
                            name:body["name"],
                            money:body["money"],
                            experience:body["experience"],
                            userId:userId
                        }).then((result)=>{
                            resolve(result);
                        },(err)=>{
                            console.error(err);
                            reject(ErrorMessages.UNKNOWN_ERROR);
                        });
                    });
                },()=>{
                    reject(ErrorMessages.ALREADY_EXISTS);
                });
            });
            
        });
    } 
    
    static alreadyHasWaifu(characterId,waifuId){
        return new Promise((resolve,reject)=>{
            Harem.findOne({
                where:{
                    waifuId:waifuId,
                    characterId:characterId
                }
            }).then((result)=>{
                if(result==null){
                    resolve();
                }
                else reject();
            },()=>{
                reject();
            });
        });
    }
    static doesCharacterExist(characterId){
        return new Promise((resolve,reject)=>{
            Character.findOne({
                where:{
                    Id:characterId
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
    
    static isCharacterNameUnique(name){
        return new Promise((resolve,reject)=>{
            Character.findOne({
                where:{
                    name:name
                }
            }).then((result)=>{
                if(result==null) resolve()
                else reject();
            },()=>{
                reject();
            });
        });
    }
}

module.exports={
    CharacterService:CharacterService
}
