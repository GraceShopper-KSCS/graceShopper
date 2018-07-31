const Sequelize = require('sequelize')
const db = require('../db')

const ProductOrder = db.define('productorder', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  unitPrice: {
    type: Sequelize.INTEGER
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1
    }
  },
  totalPrice: {
    type: Sequelize.VIRTUAL,
    get: function () {
      return this.getDataValue('unitPrice') * this.getDataValue('quantity')
    }
  }
})
module.exports = ProductOrder
