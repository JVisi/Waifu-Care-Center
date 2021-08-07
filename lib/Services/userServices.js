const { User, createUser } =require('../ORM/Models/user')
const { generateId, encryptPassword, comparePassword, signToken, ErrorMessages }= require('../config');

class UserService{
    
    static register=(body)=>{           //contains email, password
        return new Promise((resolve,reject)=>{
            this.isEmailUnique(body).then((result)=>{
                console.log("email unique:", result)
                generateId().then((Id)=>{
                    encryptPassword(body['password']).then((passwordToStore)=>{
                    createUser(Id,body['email'],passwordToStore).then((created)=>{
                            console.log(created);
                            const token = signToken(created.dataValues)
                            resolve(token);
                        },(rejected)=>{
                            console.log(rejected);
                            reject(ErrorMessages.UNKNOWN_ERROR);
                        })
                    });
                });
            },()=>{
                console.log("rejected")
                reject(ErrorMessages.EMAIL_IN_USE);
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
                        console.log(result)
                        if(result){
                            console.log(user.dataValues)
                            const token = signToken(user.dataValues)
                            resolve(token);
                        }
                        else{
                            reject(ErrorMessages.NOT_VALID);
                        }
                    });
                }
            },(rejected)=>{
                reject(ErrorMessages.UNKNOWN_ERROR);
            });
        })
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

}
            //wrap the whole shit in a class and make these static methods

module.exports={
    UserService:UserService
}