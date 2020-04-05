const sqer=require('../setting').sequelize;
const {Sequelize}=require('sequelize');
const {Waifu}=require('./waifu');
const {Character}=require('./character');

const Harem=sqer.define('harem',{
    Id:{
        type:Sequelize.STRING,
        autoIncrement:false,
        allowNull:false,
        unique:true,
        primaryKey:true
    },
    happiness:{
        type:Sequelize.STRING,
        allowNull:false
    },tiredness:{
        type:Sequelize.INTEGER,
        allowNull:false
    },battleExp:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
    },
    {
        timestamps:false,
    });
    //Waifu.belongsToMany(Character, { through: Harem });
   // Character.belongsToMany(Waifu, { through: Harem });
   Character.hasMany(Harem);
   Harem.belongsTo(Character);
   Waifu.hasMany(Harem);
   Harem.belongsTo(Waifu);
module.exports={
    Harem:Harem
}