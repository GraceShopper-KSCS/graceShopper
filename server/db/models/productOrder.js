const Sequelize = require('sequelize')
const db = require('../db')

const ProductOrder = db.define('productorder', {
  unitPrice: {
    type: Sequelize.INTEGER
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1
    }
  }
})
module.exports = ProductOrder
