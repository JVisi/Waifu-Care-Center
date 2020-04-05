const {User} = require('../ORM/Models/user');
            //wrap the whole shit in a class and make these static methods
const isEmailUnique=(body)=>{            //contains email, password
    return new Promise((resolve)=>{
        User.findAll({
            where:{
                email:body['email']
            }
        }).then((result)=>{
            if(result.length==0){
                resolve(true);
            }
            else{
                resolve(false);
            }
        });
    });
}
const register=(body)=>{        //need a generateId
    return new Promise((resolve,reject)=>{
        isEmailUnique(body).then((result)=>{
            if(result){
                //save to DB
                resolve("userObject");
            }
            else{
                reject("Email already exist");
            }
        });
    });
}
module.exports={
    register:register
}