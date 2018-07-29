'use strict'

const db = require('../server/db')
const {
  User,
  Product,
  Category,
  Order,
  ProductOrder
} = require('../server/db/models')

/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!
  const users = await Promise.all([
    User.create({email: 'murphy@email.com', password: '123'}),
    User.create({email: 'admin@email.com', password: 'admin', admin: true})
  ])

  const cody = await User.create({email: 'cody@email.com', password: '123'})

  const categories = await Promise.all([
    Category.create({name: 'css'}),
    Category.create({name: 'javascript'}),
    Category.create({name: 'python'})
  ])
  const newBook = await Product.create({
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
    price: 1495,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/51vYMYLZiuL._SX386_BO1,204,203,200_.jpg',
    inventory: 33,
    category: 'HTML'
  })
  const html = await Category.create({name: 'html'})

  await html.addProduct(newBook)

  const products = await Promise.all([
    Product.create({
      title: 'HTML and CSS: Design and Build Websites',
      author: 'Jon Duckett',
      description:
        'Every day, more and more people want to learn some HTML and CSS. Joining the professional web designers and programmers are new audiences who need to know a little bit of code at work (update a content management system or e–commerce store) and those who want to make their personal blogs more attractive. Many books teaching HTML and CSS are dry and only written for those who want to become programmers, which is why this book takes an entirely new approach.',
      price: 2158,
      imageUrl:
        'https://dzvfs5sz5rprz.cloudfront.net/media/catalog/product/cache/1/image/1200x/040ec09b1e35df139433887a97daa66f/h/t/html_and_css_design_and_build_websites_book_1st_edition-1.jpg',

      inventory: 50,
      category: 'HTML'
    }),
    Product.create({
      title: 'You Don’t Know JS: Up and Going by Kyle Simpson',
      author: 'Kyle Simpson',
      description: `It’s easy to learn parts of JavaScript, but much harder to learn it completely—or even sufficiently—whether you’re new to the language or have used it for years. With the "You Don’t Know JS" book series, you’ll get a more complete understanding of JavaScript, including trickier parts of the language that many experienced JavaScript programmers simply avoid.

      The series’ first book, Up & Going, provides the necessary background for those of you with limited programming experience. By learning the basic building blocks of programming, as well as JavaScript’s core mechanisms, you’ll be prepared to dive into the other, more in-depth books in the series—and be well on your way toward true JavaScript.

      With this book you will:

      Learn the essential programming building blocks, including operators, types, variables, conditionals, loops, and functions
      Become familiar with JavaScript's core mechanisms such as values, function closures, this, and prototypes
      Get an overview of other books in the series—and learn why it’s important to understand all parts of JavaScript`,
      price: 299,
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/41L18FvA5rL._SX331_BO1,204,203,200_.jpg',
      inventory: 35,
      category: 'Javascript'
    }),
    Product.create({
      title: 'Code: The Hidden Language of Computer Hardware and Software',
      author: 'Charles Petzold',
      description: `"What do flashlights, the British invasion, black cats, and seesaws have to do with computers? In CODE, they show us the ingenious ways we manipulate language and invent new means of communicating with each other. And through CODE, we see how this ingenuity and our very human compulsion to communicate have driven the technological innovations of the past two centuries.

    Using everyday objects and familiar language systems such as Braille and Morse code, author Charles Petzold weaves an illuminating narrative for anyone who’s ever wondered about the secret inner life of computers and other smart machines.

    It’s a cleverly illustrated and eminently comprehensible story—and along the way, you’ll discover you’ve gained a real context for understanding today’s world of PCs, digital media, and the Internet. No matter what your level of technical savvy, CODE will charm you—and perhaps even awaken the technophile within."`,
      price: 2005,
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/310WZuKyEUL._SX334_BO1,204,203,200_.jpg',
      inventory: 23,
      category: 'General'
    }),
    Product.create({
      title: 'The Pragmatic Programmer: From Journeyman to Master',
      author: 'Andrew Hunt and David Thomas',
      description: `Lessons on how to improve productivity, accuracy, and job satisfaction. Designed for an audience from the new coder to the experienced programmer or manager. Develop the attitude that helps you become the best at what you do. The purpose of this book is to bring you from the coder without a foundation or discipline for programming into someone who has a strong understanding of variables, objects, algorithms, and data structures. It is a smooth transition from this book into any coding language, and for this reason we recommend this book as not a language book but a primer in every programming language.`,
      price: 1676,
      imageUrl:
        'https://coderseye.com/wp-content/uploads/the-pragmatic-programmer-andrew-hunt.jpg?x59762',
      inventory: 18,
      category: 'General'
    })
    // ,
    // Product.create({title: "",
    // author: "",
    // description: ``,
    // price: ,
    // imageUrl: '',
    // inventory: ,
    // category:
    // })
  ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!

  const order1 = await Order.create({
    status: 'pending',
    userId: cody.id
  })
  const order1Line = await ProductOrder.create({
    orderId: order1.id,
    quantity: '3',
    productId: 1,
    unitPrice: 1495
  })

  //const newBook2 = {...newBook, unitPrice: newBook.price, quantity: 3}

  // await order1.addProduct(newBook, {unitPrice: 3303, quantity: '4'})
  // const newLine4 = await order1.addProduct(newBook, {unitPrice: 3303, quantity: '3'})
  // let newInstance = newLine4[0]
  // console.log('********', newInstance[0].dataValues)
  //  const newInstance = await ProductOrder.findById(newLine4.id)
  //newInstance = await newInstance.update({unitPrice: 3303, quantity: '4'})
  // await ProductOrder.update(
  //   {unitPrice: 3303, quantity: '4'},
  //   {
  //     where: {
  //       id: newLine4.id
  //     }
  //   }
  // )
  const order1Line2 = await ProductOrder.create({
    orderId: order1.id,
    quantity: '1',
    productId: 2,
    unitPrice: 2158
  })

  // console.log(
  //   `seeded ${users.length} users, ${categories.length} categories and ${
  //     products.length
  //   } products`
  // )
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
