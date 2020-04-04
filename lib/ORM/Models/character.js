const sqer=require('../setting').sequelize;
const {Sequelize}=require('sequelize');
const {User}=require('./user');


const Character=sqer.define('character',{
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
    },money:{
        type:Sequelize.INTEGER,
        allowNull:false,
        defaultValue:10000
    },experience:{
        type:Sequelize.INTEGER,
        allowNull:false,
        defaultValue:0
    }
    },
    {
        timestamps:false,
    });
    Character.belongsTo(User,{foreignKey:'userId'});
module.exports={
    Character:Character
}