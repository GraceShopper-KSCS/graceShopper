const Sequelize = require('sequelize')
const db = require('../db')
const ProductOrder = require('./productOrder')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM,
    values: ['pending', 'processing', 'complete'],
    defaultValue: 'pending'
  }
})
Order.prototype.totalPrice = async function() {
  const productorder = await ProductOrder.findAll({
    where: {
      orderid: this.id
    }
  })

  if (productorder) {
    const total = productorder.reduce((sum, qty) => sum + qty.unitprice, 0)
    return total
  }
}

module.exports = Order
