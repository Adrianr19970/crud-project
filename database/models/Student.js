const Sequelize = require('sequelize');
const db = require('../db');

const Student = db.define("student", {

  firstname: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  lastname: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },

  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://www.shareicon.net/data/512x512/2016/08/18/814671_user_512x512.png'
  },

  gpa: {
    type: Sequelize.DECIMAL,
    validate: {
      max: 4.0,
      min: 0.0
    }
  }

});

module.exports = Student;