const Sequelize = require('sequelize')
const db = require('../db')

const ProductOrder = db.define('productorder', {
  unitPrice: {
    type: Sequelize.INTEGER

    // set(val) {
    //   this.setDataValue('price', val * 100)
    // }
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1
    }
  },
  totalPrice: {
    type: Sequelize.VIRTUAL,
    get: function() {
      return this.getDataValue('unitprice') * this.getDataValue('quantity')
    }
  }
})
module.exports = ProductOrder
