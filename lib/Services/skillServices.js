const {Waifu} = require('../ORM/Models/waifu');
const {SpecialSkill} = require('../ORM/Models/specialSkill');
const {Harem_Skill} = require('../ORM/Models/harem_skill');
const {Harem} = require('../ORM/Models/harem');
const {generateId,ErrorMessages}=require('../config');

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
}

module.exports={
    SkillService:SkillService
}