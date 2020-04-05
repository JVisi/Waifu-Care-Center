const sqer=require('../setting').sequelize;
const {Sequelize}=require('sequelize');
const {Anime}=require('./anime');

const Waifu=sqer.define('waifu',{
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
    },age:{
        type:Sequelize.STRING,
        allowNull:false
    },kawaiiness:{
        type:Sequelize.INTEGER,
        allowNull:false
    },type:{
        type:Sequelize.STRING
    },price:{
        type:Sequelize.INTEGER,
        allowNull:false
    },canBattle:{
        type:Sequelize.BOOLEAN,
        allowNull:false
    },
    },
    {
        timestamps:false,
    });
    Anime.hasMany(Waifu);
    Waifu.belongsTo(Anime);
module.exports={
    Waifu:Waifu
}