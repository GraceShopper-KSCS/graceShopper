const router = require('express').Router()
const { Order, Product, ProductOrder } = require('../db/models/')

///need to add a beforeCreate hook? that checks if there is already a

module.exports = router
// const dummyBook = {
//   id: '88',
//   title: 'HTML & XHTML: The Definitive Guide',
//   author: 'Chuck Musciano',
//   description: `Put everthing you need to know about HTML & XHTML at your fingertips. For nearly a decade, hundreds of thousands of web developers have turned to HTML & XHTML: The Definitive Guide to master standards-based web development. Truly a definitive guide, the book combines a unique balance of tutorial material with a comprehensive reference that even the most experienced web professionals keep close at hand. From basic syntax and semantics to guidelines aimed at helping you develop your own distinctive style, this classic is all you need to become fluent in the language of web design.

//   The new sixth edition guides you through every element of HTML and XHTML in detail, explaining how each element works and how it interacts with other elements. You'll also find detailed discussions of CSS (Cascading Style Sheets), which is intricately related to web page development. The most all-inclusive, up-to-date book on these languages available, this edition covers HTML 4.01, XHTML 1.0, and CSS2, with a preview of the upcoming XHTML2 and CSS3. Other topics include the newer initiatives in XHTML (XForms, XFrames, and modularization) and the essentials of XML for advanced readers. You'll learn how to:

//   Use style sheets to control your document's appearance
//   Work with programmatically generated HTML
//   Create tables, both simple and complex
//   Use frames to coordinate sets of documents
//   Design and build interactive forms and dynamic documents
//   Insert images, sound files, video, Java applets, and JavaScript programs
//   Create documents that look good on a variety of browsers`,
//   price: 14.95,
//   imageUrl:
//     'https://images-na.ssl-images-amazon.com/images/I/51vYMYLZiuL._SX386_BO1,204,203,200_.jpg',
//   inventory: 33,
//   category: 'HTML'
// }

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
      const newOrderInstance = await Order.findOne({
        where: {
          userId: req.user.dataValues.id,
          status: 'pending'
        },
        include: [{ all: true }]
      })

      res.json(newOrderInstance.products)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    if (!req.user) {
      if (req.session.cart) { //if the cart exist
        const product = req.session.cart.find((product) => product.id === req.body.id) //find out the product is in the cart
        if (product) {
          const index = req.session.cart.indexOf(product)
          req.session.cart[index].quantity++
          res.json(req.session.cart[index])
        }
        else {
          req.body.quantity = 1
          req.session.cart.push(req.body)
          res.json(req.session.cart[req.session.cart.length - 1])
        }
      }

      else {
        req.body.quantity = 1
        req.session.cart = [req.body]
        res.json(req.session.cart[0])
      }
    } else {
      const product = req.body
      console.log('product===>', product)
      const order = await Order.findOne({ where: { userId: req.user.id, status: "pending" } })
      console.log('order', order)
      const existProduct = await ProductOrder.findOne({ where: { productId: product.id, orderId: order.id } })
      if (existProduct) {
        const updatedProduct = await existProduct.update({ quantity: existProduct.quantity + product.quantity })
        res.json(updatedProduct)

      }
      else {
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
    req.session.cart[index].quantity--
    res.json(req.session.cart[index].quantity)
  }
  else {
    const order = await Order.findOne({ where: { userId: req.user.id, status: "pending" } })
    const existProduct = await ProductOrder.findOne({ where: { productId: id, orderId: order.id } })
    const updatedProduct = await existProduct.update({ quantity: existProduct.quantity - 1 })
    res.json(updatedProduct.quantity)

  }
})

router.put('/incquantity/:id', async (req, res, next) => {
  const id = +req.params.id
  if (!req.user) {
    const product = req.session.cart.find(product => product.id === id)
    const index = req.session.cart.indexOf(product)
    if (!req.session.cart[index].quantity) {
      req.session.cart[index].quantity = 1
    } else {
      req.session.cart[index].quantity++
    }
    // console.log(req.session.cart[index])
    res.json(req.session.cart[index].quantity)
  }
  else {
    const order = await Order.findOne({ where: { userId: req.user.id, status: "pending" } })
    const existProduct = await ProductOrder.findOne({ where: { productId: id, orderId: order.id } })
    const updatedProduct = await existProduct.update({ quantity: existProduct.quantity + 1 })
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
  }
  else {
    const order = await Order.findOne({
      where: {
        userId: req.user.id,
        status: 'pending'
      }
    })
    await ProductOrder.destroy({ where: { orderId: order.id, productId: id } })

    const newOrderInstance = await Order.findById(order.id, {
      include: [{ all: true }]
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
      await ProductOrder.destroy({ where: { orderId: order.id } })
      res.json(204)
    }
  } catch (err) {
    next(err)
  }
})
