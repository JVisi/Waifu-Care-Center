const sqer=require('../setting').sequelize;
const {Sequelize}=require('sequelize');
const bcrypt=require('bcrypt');


const User=sqer.define('user',{
    Id:{
        type:Sequelize.STRING,
        autoIncrement:false,
        allowNull:false,
        unique:true,
        primaryKey:true
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true,
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    rightLevel:{
        type:Sequelize.INTEGER,
        allowNull:true,
        defaultValue:0
    }
    },
    {
        timestamps:false
    });
const createUser=async (Id,email,password)=>{
    return new Promise((resolve,reject)=>{
        try{
            let usr= User.create({Id:Id,email:email,password:password});
            resolve(usr);
        }catch(err){
            console.error(err);
            reject(err);
        }
    })
}
    
module.exports={
    User:User,
    createUser:createUser
}