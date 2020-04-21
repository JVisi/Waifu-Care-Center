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
    specialSkillId:{
        type:Sequelize.STRING(36),
        allowNull:false
    }
},{
    timestamps:false
});

SpecialSkill.hasMany(Harem_Skill,{foreignKey:{allowNull:false}});
Harem_Skill.belongsTo(SpecialSkill,{foreignKey:{allowNull:false}});
Harem.hasMany(Harem_Skill,{foreignKey:{allowNull:false}});
Harem_Skill.belongsTo(Harem,{foreignKey:{allowNull:false}});

module.exports={
    Harem_Skill:Harem_Skill
}