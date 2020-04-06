const {User,createUser} = require('../ORM/Models/user');
const {generateId,encryptPassword,ErrorMessages}=require('../config');

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
            this.isEmailUnique(body).then(()=>{
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
                reject(ErrorMessages.DUPLICATE_ENTRY)
            });
        });
    }
}
            //wrap the whole shit in a class and make these static methods

module.exports={
    UserService:UserService
}