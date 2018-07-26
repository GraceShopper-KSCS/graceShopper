const router = require('express').Router()

module.exports = router
const dummyBook = {
  title: 'HTML & XHTML: The Definitive Guide',
  author: 'Chuck Musciano',
  description: `Put everthing you need to know about HTML & XHTML at your fingertips. For nearly a decade, hundreds of thousands of web developers have turned to HTML & XHTML: The Definitive Guide to master standards-based web development. Truly a definitive guide, the book combines a unique balance of tutorial material with a comprehensive reference that even the most experienced web professionals keep close at hand. From basic syntax and semantics to guidelines aimed at helping you develop your own distinctive style, this classic is all you need to become fluent in the language of web design.

  The new sixth edition guides you through every element of HTML and XHTML in detail, explaining how each element works and how it interacts with other elements. You'll also find detailed discussions of CSS (Cascading Style Sheets), which is intricately related to web page development. The most all-inclusive, up-to-date book on these languages available, this edition covers HTML 4.01, XHTML 1.0, and CSS2, with a preview of the upcoming XHTML2 and CSS3. Other topics include the newer initiatives in XHTML (XForms, XFrames, and modularization) and the essentials of XML for advanced readers. You'll learn how to:

  Use style sheets to control your document's appearance
  Work with programmatically generated HTML
  Create tables, both simple and complex
  Use frames to coordinate sets of documents
  Design and build interactive forms and dynamic documents
  Insert images, sound files, video, Java applets, and JavaScript programs
  Create documents that look good on a variety of browsers`,
  price: 14.95,
  imageUrl:
    'https://images-na.ssl-images-amazon.com/images/I/51vYMYLZiuL._SX386_BO1,204,203,200_.jpg',
  inventory: 33,
  category: 'HTML'
}

router.get('/', (req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = [dummyBook]
  }
  res.json(req.session.cart)
})

router.post('/', (req, res, next) => {
  if (req.session.cart) {
    req.session.cart.push(req.body)
  } else {
    req.session.cart = [req.body]
  }
  res.json(req.session.cart)
})
