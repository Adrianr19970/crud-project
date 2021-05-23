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
    validate: {
      allowNull: false,
      isEmail: true,
      notEmpty: true
    }
  },

  imageUrl: {
    type: Sequelize.STRING,
  },

  gpa: {
    type: Sequelize.STRING,
    validate: {
      max: 4.0,
      min: 0.0
    }
  }

});

module.exports = Student;