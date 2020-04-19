const sqer=require('../setting').sequelize;
const {Sequelize}=require('sequelize');
const {SpecialSkill}=require('./specialSkill');
const {Harem}=require('./harem');

const Harem_Skill=sqer.define('harem_skill',{
    Id:{
        type:Sequelize.STRING,
        autoIncrement:false,
        allowNull:false,
        unique:true,
        primaryKey:true
    },
},{
    timestamps:false
});

SpecialSkill.hasMany(Harem_Skill);
Harem_Skill.belongsTo(SpecialSkill);
Harem.hasMany(Harem_Skill);
Harem_Skill.belongsTo(Harem);

module.exports={
    Harem_Skill:Harem_Skill
}