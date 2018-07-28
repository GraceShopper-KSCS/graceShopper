const router = require('express').Router()
const {Order, Product} = require('../db/models')

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
