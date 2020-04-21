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
        allowNull:true,
        defaultValue:10000
    },experience:{
        type:Sequelize.INTEGER,
        allowNull:true,
        defaultValue:0
    }
    },
    {
        timestamps:false,
    });
    User.hasMany(Character,{foreignKey: { allowNull: false }, onDelete: 'CASCADE'});
    Character.belongsTo(User,{foreignKey: { allowNull: false }, onDelete: 'CASCADE'});
module.exports={
    Character:Character
}