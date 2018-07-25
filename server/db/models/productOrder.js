const Sequelize = require('sequelize')
const db = require('../db')

const ProductOrder = db.define('productorder', {
  unitPrice:{
    type:Sequelize.FLOAT
  }
})
module.exports = ProductOrder;
