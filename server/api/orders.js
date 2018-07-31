const router = require('express').Router()
const {Order, Product, ProductOrder} = require('../db/models')
const {stripe} = require('../index')

module.exports = router

router.get('/history', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.session.passport.user,
        status: 'complete'
      },
      include: [{all: true, nested: true}]
    })

    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/totalprice', async (req, res, next) => {
  try {
    const order = await Order.findAll({
      where: {
        userId: req.user.dataValues.id,
        status: 'pending'
      }
    })

    const totalPrices = await ProductOrder.findAll({
      where: {orderId: order[0].dataValues.id}
    })
    let sum = 0
    totalPrices.forEach(book => {
      sum = book.totalPrice + sum
    })

    res.json(sum)
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    console.log('USER', req.user.dataValues.id)
    const order = await Order.findOne({
      where: {
        userId: req.user.id,
        status: 'pending'
      }
    })
    const updatedOrder = await order.update({status: 'complete'})
    res.json(updatedOrder)
  } catch (err) {
    next(err)
  }
})
