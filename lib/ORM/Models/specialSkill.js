const sqer=require('../setting').sequelize;
const {Sequelize}=require('sequelize');
const {Waifu}=require('./waifu');


const SpecialSkill=sqer.define('special_skill',{
    Id:{
        type:Sequelize.STRING,
        autoIncrement:false,
        allowNull:false,
        unique:true,
        primaryKey:true
    },
    skillName:{
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
    SpecialSkill.belongsTo(Waifu,{foreignKey:'waifuId'});
module.exports={
    SpecialSkill:SpecialSkill
}