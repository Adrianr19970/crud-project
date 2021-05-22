const Sequelize = require('sequelize');
const db = require('../db');

const Campus = db.define("campus", {

  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  
  image:{
    type: Sequelize.STRING,
  },
  address:{
    type:Sequelize.STRING,
  },

  description: {
    type: Sequelize.STRING,
  }

});

module.exports = Campus;