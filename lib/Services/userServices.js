const {User,createUser} = require('../ORM/Models/user');
const {generateId,encryptPassword,comparePassword,ErrorMessages}=require('../config');

class UserService{
    static isEmailUnique=(body)=>{            //contains email, password
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
    static register=(body)=>{        //need a generateId
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
    static login=(body)=>{
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
}
            //wrap the whole shit in a class and make these static methods

module.exports={
    UserService:UserService
}