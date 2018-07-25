const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  total: {
    type: Sequelize.INTEGER
  },
  quantity: {
    type: Sequelize.INTEGER
  },
  status: {
    type: Sequelize.ENUM,
    values: ['pending', 'processing', 'complete'],
    defaultValue: 'pending'
  }
})
module.exports = Order
