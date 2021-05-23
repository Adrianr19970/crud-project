const Sequelize = require('sequelize');
const db = require('../db');

const Campus = db.define("campus", {

  name: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true
  },
  
  image: {
    type: Sequelize.STRING,
    defaultValue: 'https://universitybusiness.com/wp-content/uploads/2020/08/Promo-lecture-hall2.png'
  },

  address: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true
  },

  description: {
    type: Sequelize.STRING,
  }

});

module.exports = Campus;