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
    
module.exports={
    User:User
}