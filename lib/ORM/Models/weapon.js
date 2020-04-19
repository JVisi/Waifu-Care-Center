const sqer=require('../setting').sequelize;
const {Sequelize}=require('sequelize');
const {Waifu}=require('./waifu');


const Weapon=sqer.define('weapon',{
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
        unique:true
    },power:{
        type:Sequelize.INTEGER,
        allowNull:false
    },intelligence:{
        type:Sequelize.INTEGER,
        allowNull:false
    },health:{
        type:Sequelize.INTEGER,
        allowNull:false
    },armor:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
    },
    {
        timestamps:false,
    });
    Weapon.hasMany(Waifu,{foreignKey:'weaponId'});
module.exports={
    Weapon:Weapon
}