const router = require('express').Router()
const {Order, Product, ProductOrder} = require('../db/models/')

///need to add a beforeCreate hook? that checks if there is already a

module.exports = router
if (process.env.NODE_ENV !== 'production') require('../../secrets')
//const keyPublishable = process.env.pk_test_FWLSZzdWrAYHVOtT0uWNPivM
const keySecret = process.env.STRIPESECRET
const stripe = require('stripe')(keySecret)
const bodyParser = require('body-parser')

router.get('/', async (req, res, next) => {
  try {
    let cart = []
    if (!req.user) {
      //if not logged in
      if (!req.session.cart) {
        req.session.cart = []
      }
      cart = req.session.cart
      res.json(cart)
    } else {
      //if logged in, create a new order instance in db for user
      const newOrderInstance = await Order.findOrCreate({
        where: {
          userId: req.user.dataValues.id,
          status: 'pending'
        },
        include: [{all: true}]
      })

      res.json(newOrderInstance[0].products)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    if (!req.user) {
      if (req.session.cart) {
        //if the cart exist
        const product = req.session.cart.find(
          product => product.id === req.body.id
        ) //find out the product is in the cart
        if (product) {
          const index = req.session.cart.indexOf(product)
          req.session.cart[index].quantity++
          req.session.cart[index].totalprice =
            req.session.cart[index].quantity * req.body.price
          res.json(req.session.cart[index])
        } else {
          req.body.quantity = 1
          req.body.totalprice = 1 * req.body.price
          req.session.cart.push(req.body)
          res.json(req.session.cart[req.session.cart.length - 1])
        }
      } else {
        req.body.quantity = 1
        req.session.cart = [req.body]
        res.json(req.session.cart[0])
      }
    } else {
      const product = req.body
      const order = await Order.findOne({
        where: {userId: req.user.id, status: 'pending'}
      })

      const existProduct = await ProductOrder.findOne({
        where: {productId: product.id, orderId: order.id}
      })
      if (existProduct) {
        const updatedProduct = await existProduct.update({
          quantity: existProduct.quantity + 1
        })
        res.json(updatedProduct)
      } else {
        product.quantity = 1
        const newProduct = await ProductOrder.create({
          unitPrice: +product.price * 100,
          quantity: product.quantity,
          productId: product.id,
          orderId: order.id
        })
        res.json(newProduct)
      }
    }
  } catch (err) {
    next(err)
  }
})

router.put('/decquantity/:id', async (req, res, next) => {
  const id = +req.params.id
  if (!req.user) {
    const product = req.session.cart.find(product => product.id === id)
    const index = req.session.cart.indexOf(product)
    req.session.cart[index].totalprice =
      req.session.cart[index].totalprice - req.session.cart[index].price
    req.session.cart[index].quantity--
    res.json(req.session.cart[index].quantity)
  } else {
    const order = await Order.findOne({
      where: {userId: req.user.id, status: 'pending'}
    })
    const existProduct = await ProductOrder.findOne({
      where: {productId: id, orderId: order.id}
    })
    const updatedProduct = await existProduct.update({
      quantity: existProduct.quantity - 1
    })
    res.json(updatedProduct.quantity)
  }
})

router.put('/incquantity/:id', async (req, res, next) => {
  const id = +req.params.id
  if (!req.user) {
    const product = req.session.cart.find(product => product.id === id)
    const index = req.session.cart.indexOf(product)
    req.session.cart[index].totalprice =
      req.session.cart[index].totalprice + req.session.cart[index].price
    if (!req.session.cart[index].quantity) {
      req.session.cart[index].quantity = 1
    } else {
      req.session.cart[index].quantity++
    }
    // console.log(req.session.cart[index])
    res.json(req.session.cart[index].quantity)
  } else {
    const order = await Order.findOne({
      where: {userId: req.user.id, status: 'pending'}
    })
    const existProduct = await ProductOrder.findOne({
      where: {productId: id, orderId: order.id}
    })
    const updatedProduct = await existProduct.update({
      quantity: existProduct.quantity + 1
    })
    res.json(updatedProduct.quantity)
  }
})

router.put('/:id', async (req, res, next) => {
  const id = +req.params.id
  if (!req.user) {
    const updatedSession = req.session.cart.filter(product => {
      return product.id !== id
    })
    req.session.cart = updatedSession

    res.json(req.session.cart)
  } else {
    const order = await Order.findOne({
      where: {
        userId: req.user.id,
        status: 'pending'
      }
    })
    await ProductOrder.destroy({where: {orderId: order.id, productId: id}})

    const newOrderInstance = await Order.findById(order.id, {
      include: [{all: true}]
    })

    res.json(newOrderInstance.products)
  }
})

router.delete('/', async (req, res, next) => {
  try {
    if (!req.user) {
      req.session.cart = []
      res.json(req.session.cart)
    } else {
      const order = await Order.findOne({
        where: {
          userId: req.user.id,
          status: 'pending'
        }
      })
      await ProductOrder.destroy({where: {orderId: order.id}})
      res.json(204)
    }
  } catch (err) {
    next(err)
  }
})

//Stripe

router.post('/charge', async (req, res) => {
  try {
    let {status} = await stripe.charges.create({
      amount: 2000,
      currency: 'usd',
      description: 'An example charge',
      source: req.body
    })

    res.json({status})
  } catch (err) {
    res.status(500).end()
  }
})
