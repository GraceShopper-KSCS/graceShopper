const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  total:{
    type:Sequelize.FLOAT
  },
  quantity:{
    type:Sequelize.INTEGER
  },status:{
    type:Sequelize.STRING,
    defaultValue:'pending'
  }
})
module.exports = Order;
