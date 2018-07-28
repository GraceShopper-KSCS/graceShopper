const router = require('express').Router()
const {Order, Product, ProductOrder} = require('../db/models/')

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

// router.get('/', async (req, res, next) => {
//   try {
//     // if (req.user) {
//     //   console.log('req.user***', req.user.dataValues.id)
//     //   const orders = await Order.findAll({
//     //     where: {
//     //       userId: req.user.dataValues.id,
//     //       status: 'pending'
//     //     },
//     //     include: [{model: Product}]
//     //   })
//     if (req.user) {
//       const order = await Order.findOrCreate({
//         where: {
//           userId: req.user.dataValues.id,
//           status: 'pending'
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
//       } else {
//         res.json(orders[0].products)
//       }
//     } else {
//       if (!req.session.cart) {
//         req.session.cart = []
//       }
//       res.json(req.session.cart)
//     }
//   } catch (err) {
//     next(err)
//   }
// })

router.get('/', async (req, res, next) => {
  try {
    let cart = []
    if (!req.user) {
      if (!req.session.cart) {
        req.session.cart = []
        cart = req.session.cart
      }
    } else {
      const orderFromDb = await Order.findOrCreate({
        where: {
          userId: req.user.id,
          status: 'pending'
        },
        include: [{model: Product}]
      })
      const orderInstance = orderFromDb[0]
      if (!req.session.cart) {
        cart = orderInstance.products
      } else {
        req.session.cart.forEach(async product => {
          try {
            await ProductOrder.create({
              unitPrice: product.price,
              quantity: product.quantity,
              productId: product.id,
              orderId: orderInstance.id
            })
          } catch (err) {
            next(err)
          }
          const updatedCart = await Order.findById(orderInstance.id, {
            include: [{model: Product}]
          })
          cart = updatedCart
        })
      }
      //if user exists, find or create order instance in db
    }
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

router.post('/', (req, res, next) => {
  req.body.quantity = 1
  if (req.session.cart) {
    req.session.cart.push(req.body)
  } else {
    req.session.cart = [req.body]
  }
  console.log(req.session.cart)
  res.json(req.session.cart)
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
  console.log(req.session.cart[index])
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

router.delete('/', (req, res, next) => {
  req.session.cart = []
  res.json(req.session.cart)
})
