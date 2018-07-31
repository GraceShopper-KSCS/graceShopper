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
      const newOrderInstance = await Order.create({
        userId: req.user.dataValues.id,
        status: 'pending'
      })
      if (req.session.cart && req.session.cart.length) {
        //if there are items in session cart, create productOrder instance in db for each item in session.cart array (i.e. add all items from session.cart to db)
        req.session.cart.forEach(async product => {
          try {
            await ProductOrder.create({
              unitPrice: +product.price * 100,
              quantity: product.quantity,
              productId: product.id,
              orderId: newOrderInstance.id
            })
          } catch (err) {
            next(err)
          }
        })
      }
      //find all orders for logged in user with status 'pending'
      const updatedCart = await Order.findAll({
        where: {userId: req.user.dataValues.id, status: 'pending'},
        include: [{model: Product}]
      })
      let newProductsArr = []
      //combine all items from multiple orders into one array for new cart
      updatedCart.map(item => {
        return item.products.forEach(product => {
          newProductsArr.push(product)
        })
      })
      cart = newProductsArr
      res.json(cart)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    req.body.quantity = 1
    if (!req.user) {
      if (req.session.cart) {
        req.session.cart.push(req.body)
      } else {
        req.session.cart = [req.body]
      }
      res.json(req.session.cart)
    } else {
      //find or create order for user
      const order = await Order.findOrCreate({
        where: {
          userId: req.user.id,
          status: 'pending'
        }
      })
      const product = req.body
      await ProductOrder.create({
        unitPrice: +product.price * 100,
        quantity: product.quantity,
        productId: product.id,
        orderId: order[0].id
      })

      const updatedOrder = await Order.findById(order[0].id, {
        include: [{model: Product}]
      })
      res.json(updatedOrder)
    }
  } catch (err) {
    next(err)
  }
})

// router.post('/', async (req, res, next) => {
//   try {
//     if (req.user) {
//       const order = await Order.findOrCreate({
//         where: {
//           userId: req.user.dataValues.id
//         }
//       })

//       if (req.session.cart) {
//         const cart = req.session.cart
//         cart.forEach(async product => {
//           try {
//             await ProductOrder.create({
//               unitPrice: product.price,
//               quantity: product.quantity,
//               productId: product.id,
//               orderId: order.id
//             })
//           } catch (err) {
//             next(err)
//           }
//         })
//         const updatedOrder = await ProductOrder.findAll({
//           where: {
//             orderId: order.id
//           }
//         })
//         res.json(updatedOrder)
//       }
//     } else {
//       if (req.session.cart) {
//         req.session.cart.push(req.body)
//       } else {
//         req.session.cart = [req.body]
//       }
//       res.json(req.session.cart)
//     }
//   } catch (err) {
//     next(err)
//   }
// })

router.put('/decquantity/:id', (req, res, next) => {
  const id = +req.params.id
  const product = req.session.cart.find(product => product.id === id)
  const index = req.session.cart.indexOf(product)
  req.session.cart[index].quantity--
  res.json(req.session.cart[index].quantity)
})

router.put('/incquantity/:id', (req, res, next) => {
  const id = +req.params.id
  const product = req.session.cart.find(product => product.id === id)
  const index = req.session.cart.indexOf(product)
  if (!req.session.cart[index].quantity) {
    req.session.cart[index].quantity = 1
  } else {
    req.session.cart[index].quantity++
  }
  // console.log(req.session.cart[index])
  res.json(req.session.cart[index].quantity)
})

router.put('/:id', (req, res, next) => {
  const id = +req.params.id

  const updatedSession = req.session.cart.filter(product => {
    return product.id !== id
  })
  req.session.cart = updatedSession

  res.json(req.session.cart)
})

router.delete('/', async (req, res, next) => {
  try {
    if (!req.user) {
      req.session.cart = []
      res.json(req.session.cart)
    } else {
      await Order.destroy({
        where: {
          userId: req.user.id,
          status: 'pending'
        }
      })
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
