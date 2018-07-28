const router = require('express').Router()
const {Order, Product} = require('../db/models')

module.exports = router

router.get('/history', async (req, res, next) => {
  try {
    console.log('TESTING 1..2..3..')
    console.log(req.session.passport.user)
    const orders = await Order.findAll({
      where: {
        userId: req.session.passport.user,
        status: 'complete'
      },
      include: [{all: true, nested: true}]
    })

    console.log('Im done!')
    res.json(orders)
  } catch (err) {
    next(err)
  }
})
