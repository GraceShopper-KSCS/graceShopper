const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM,
    values: ['pending', 'processing', 'complete'],
    defaultValue: 'pending'
  }
})
module.exports = Order
