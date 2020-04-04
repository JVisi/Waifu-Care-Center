const Sequelizer = require('sequelize');
const sequelize = new Sequelizer('waifu_care_center', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
  });
module.exports={
    sequelize:sequelize
}