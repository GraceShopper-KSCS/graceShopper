const router = require('express').Router()
const User = require('../db/models/user')
const { Order, Product, ProductOrder } = require('../db/models/')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } })
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      const newOrderInstance = await Order.findOrCreate({
        where: {
          userId: user.id,
          status: 'pending'
        }
      })
      if (req.session.cart && req.session.cart.length) {

        //if there are items in session cart, create productOrder instance in db for each item in session.cart array (i.e. add all items from session.cart to db)
        req.session.cart.forEach(async product => {

          const existProduct = await ProductOrder.findOne({ where: { productId: product.id, orderId: newOrderInstance[0].id } })
          if (existProduct) {
            console.log('exist', existProduct.quantity)
            console.log('session', product.quantity)
            await existProduct.update({ quantity: existProduct.quantity + product.quantity })
          }
          else {
            await ProductOrder.create({
              unitPrice: +product.price * 100,
              quantity: product.quantity,
              productId: product.id,
              orderId: newOrderInstance[0].id
            })
          }
        })
        req.session.cart = []
      }
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', async (req, res) => {

  res.json(req.user)
})

router.use('/google', require('./google'))
