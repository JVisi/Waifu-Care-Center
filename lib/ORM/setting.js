const Sequelizer =require('sequelize');
const sequelize = new Sequelizer('waifu_care_center', 'root', 'Oksioksi1', {
    host: 'localhost',
    dialect: 'mysql'
  });
module.exports={sequelize};
