const {User,createUser} = require('../ORM/Models/user');
const {Character} = require('../ORM/Models/character');
const {generateId,encryptPassword,comparePassword,ErrorMessages}=require('../config');

class UserService{
    
    static register=(body)=>{           //contains email, password
        return new Promise((resolve,reject)=>{
            this.isEmailUnique(body).then((result)=>{
                generateId().then((Id)=>{
                    encryptPassword(body['password']).then((passwordToStore)=>{
                        createUser(Id,body['email'],passwordToStore).then((created)=>{
                            console.log(created);
                            resolve(created);
                        },(rejected)=>{
                            console.log(rejected);
                            reject(ErrorMessages.UNKNOWN_ERROR);
                        })
                    });
                });
            },()=>{
                reject(ErrorMessages.ALREADY_EXISTS)
            });
        });
    }
    static login=(body)=>{              //contains email, password
        return new Promise((resolve,reject)=>{
            User.findOne({
                where:{
                    email:body['email']
                }
            }).then((user)=>{
                if(user==null){
                    reject(ErrorMessages.NOT_VALID);
                }
                else{
                    comparePassword(body['password'],user.dataValues.password).then((result)=>{
                        if(result){
                            resolve(user);
                        }
                        else{
                            reject(ErrorMessages.NOT_VALID);
                        }
                    });
                }
            });
        });
    }
    static setCharacter=(body)=>{       //(user)id, (character)name
        return new Promise((resolve,reject)=>{
            this.userHasCharacter(body["id"]).then((result)=>{
                if(result.length!=0){
                    reject(ErrorMessages.ALREADY_EXISTS);
                }
                else{
                    this.isCharacterNameUnique(body["name"]).then(()=>{
                        let money;
                        let experience;
                        if(body["money"]!=undefined && typeof body["money"]==="number") money=body["money"];
                        if(body["experience"]!=undefined && typeof body["experience"]==="number") experience=body["experience"];
                        generateId().then((characterId)=>{
                            Character.create({
                                Id:characterId,
                                name:body["name"],
                                money:money,
                                experience:experience,
                                userId:body["id"]
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
                }
            });
            
        });
    }
    static isEmailUnique=(body)=>{
        return new Promise((resolve,reject)=>{
            User.findAll({
                where:{
                    email:body['email']
                }
            }).then((result)=>{
                if(result.length==0){
                    resolve();
                }
                else{
                    reject();
                }
            });
        });
    }
    static userHasCharacter(userId){    //if has: characterId, does not have: null
        return new Promise((resolve)=>{
            Character.findAll({
                where:{
                    userId:userId
                }
            }).then((result)=>{
                resolve(result);
            })
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
            });
        });
    }
}
            //wrap the whole shit in a class and make these static methods

module.exports={
    UserService:UserService
}