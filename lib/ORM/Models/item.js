const sqer=require('../setting').sequelize;
const {Sequelize}=require('sequelize');


const Item=sqer.define('item',{
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
        allowNull:false,
    },intelligence:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },health:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },armor:{
        type:Sequelize.INTEGER,
        allowNull:false,
    }
    },
    {
        timestamps:false,
    });
module.exports={
    Item:Item
}