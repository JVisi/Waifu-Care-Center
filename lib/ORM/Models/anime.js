const sqer=require('../setting').sequelize;
const {Sequelize}=require('sequelize');

const Anime=sqer.define('anime',{
    Id:{
        type:Sequelize.STRING,
        autoIncrement:false,
        allowNull:false,
        unique:true,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true,
    },
    jap_name:{
        type:Sequelize.STRING,
        allowNull:true,
        unique:true
    },
    createdAt:{
        type:Sequelize.DATE,
        allowNull:false
    }
    },
    {
        timestamps:false,
    });
    
module.exports={
    Anime:Anime
}