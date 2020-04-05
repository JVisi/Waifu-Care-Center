const sqer=require('../setting').sequelize;
const {Sequelize}=require('sequelize');


const Activity=sqer.define('activity',{
    Id:{
        type:Sequelize.STRING,
        autoIncrement:false,
        allowNull:false,
        unique:true,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    happiness:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    tiredness:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    experience:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
    },
    {
        timestamps:false,
    });
    
module.exports={
    Activity:Activity
}