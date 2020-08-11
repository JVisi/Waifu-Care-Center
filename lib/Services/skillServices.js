const {Waifu} = require('../ORM/Models/waifu');
const {SpecialSkill} = require('../ORM/Models/specialSkill');
const {Harem_Skill} = require('../ORM/Models/harem_skill');
const {Harem} = require('../ORM/Models/harem');
const {generateId,ErrorMessages}=require('../config');
const {CharacterService}=require('./characterServices');

class SkillService{
    static getSkillsOfWaifu=(body)=>{
        return new Promise((resolve,reject)=>{
            SpecialSkill.findAll({
                where:{
                waifuId:body["waifuId"]
            }}).then((skills)=>{resolve(skills)},
            (err)=>{
                console.error(err);
                reject(ErrorMessages.UNKNOWN_ERROR);
            });
        });
    }
    // body has to contain: characterId, waifuId, SkillId
    static obtainSkill=(body)=>{
        return new Promise((resolve,reject)=>{
            this.doesSkillExist(body['skillId']).then((skill)=>{
                this.isSkillAvailableForWaifu(body['skillId'],body['waifuId']).then(()=>{
                    generateId().then((id)=>{
                        console.log("generated Id",id)
                        this.isAlreadyBought(body['characterId'],body['waifuId'],body['skillId']).then((haremId)=>{
                            CharacterService.updateMoney(body['characterId'],skill.price).then(()=>{
                                Harem_Skill.create({
                                    Id:id,
                                    specialSkillId:body['skillId'],
                                    haremId:haremId
                                }).then((haremSkill)=>{
                                    resolve(haremSkill);
                                },()=>{reject(ErrorMessages.UNKNOWN_ERROR)});
                            },()=>{reject(ErrorMessages.NOT_ENOUGH)});
                        },()=>{reject(ErrorMessages.ALREADY_EXISTS)});
                    },()=>{reject(ErrorMessages.UNKNOWN_ERROR)})
                },()=>{reject(ErrorMessages.UNAVAILABLE);});
            },()=>{reject(ErrorMessages.NOT_FIND);});
        });
        
    }
    static isSkillAvailableForWaifu(skillId,waifuId){
        return new Promise((resolve,reject)=>{
            SpecialSkill.findOne({
                where:{
                    Id:skillId,
                    waifuId:waifuId
                }
            }).then((skill)=>{
                if(skill!=null){
                    resolve();
                }else{reject();}
            },()=>{
                reject(ErrorMessages.UNKNOWN_ERROR);
            });
        });
    }
    static isAlreadyBought(characterId,waifuId,skillId){
        return new Promise((resolve,reject)=>{
            Harem.findOne({
                where:{
                    characterId:characterId,
                    waifuId:waifuId
                }
            }).then((harem)=>{
                if(harem!=null){ 
                    Harem_Skill.findOne({
                        where:{
                            haremId:harem.dataValues.Id,
                            specialSkillId:skillId
                        }
                    }).then((haremSkill)=>{
                        if(haremSkill==null){
                            resolve(harem.dataValues.Id);
                        }
                        else{reject();}
                    },()=>{
                        reject(ErrorMessages.UNKNOWN_ERROR);
                    });   
                }
                else{reject();}
            },()=>{
                reject(ErrorMessages.UNKNOWN_ERROR);
            });
        });
    }
    static doesSkillExist(skillId){
        console.log(skillId);
        return new Promise((resolve,reject)=>{
            SpecialSkill.findOne({
                where:{
                    Id:skillId
                }
            }).then((skill)=>{
                if(skill!=null){
                    resolve(skill);
                }
                else{
                    reject();
                }
            },()=>{
                reject(ErrorMessages.UNKNOWN_ERROR);
            })
        });
    }

}

module.exports={
    SkillService:SkillService
}