const Sequelize = require('sequelize')
const db = require('../db')
const Review = db.define('reviews', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  rating: {
    type: Sequelize.INTEGER
  }
})
module.exports = Review
