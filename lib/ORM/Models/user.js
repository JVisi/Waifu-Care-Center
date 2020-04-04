const sqer=require('../setting').sequelize;
const {Sequelize}=require('sequelize');


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
    }
    },
    {
        timestamps:false,
    });
    
module.exports={
    User:User
}