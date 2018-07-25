const Sequelize = require('sequelize')
const db = require('../db')
const Product = require('./product')

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

ProductOrder.prototype.updateInventory = async function() {
  const prod = await Product.findById(this.productId)
  prod.inventory -= this.quantity
  await prod.update(prod.inventory)
}

module.exports = ProductOrder
