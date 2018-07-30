'use strict'

const db = require('../server/db')
const {
  User,
  Product,
  Category,
  Order,
  ProductOrder,
  Review
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
<<<<<<< HEAD

  const cody = await User.create({email: 'cody@email.com', password: '123'})

  const categories = await Promise.all([
    Category.create({name: 'css'}),
    Category.create({name: 'javascript'}),
    Category.create({name: 'python'})
=======
  const reviews = await Promise.all([
    Review.create({
      title: 'Enjoyed this Code Book',
      content:
        'Okay I have read a lot of development and code books and while there are a lot of good ones out there, I would say this has been one of my favorites. The author has done very well in explaining conceptually and with practical application and use of the development process and understanding syntax of HTML and CSS. Love it!',
      rating: 1
    }),

    Review.create({
      title:
        'Yes, for beginners: Large font and illustrations make for easy reading',
      content: 'Just as the subtitle describes "for complete beginners',
      rating: 3
    }),
    Review.create({
      title: 'Terrific basic book',
      content:
        'This book is a pleasure to read. Most technical books take some intestinal fortitude to slog through the boring parts, and reflect the geeky mentality of their authors.',
      rating: 2.5
    }),
    Review.create({
      title: 'Outdated',
      content: 'The book was outdated.',
      rating: 0
    }),
    Review.create({
      title: 'Lifesaver!',
      content:
        'Several years later I finally got around to reading it cover to cover (I took a class) and let me tell you I could not have gotten by without this book.',
      rating: 4
    }),
    Review.create({
      title: 'Mind-Blowing content.... for front end developers',
      content:
        'There was soooo much new stuff in this book that I didnot find on youtube tutorials. ',
      rating: 4.5
    }),
    Review.create({
      title: 'Excellent Instruction',
      content:
        'I really like this book. A lot. The information is fantastic and will have you rolling in no time, but the layout really is something else. This is one of the most pleasantly designed books I have ever encountered and I do a ton of reading.',
      rating: 5
    }),
    Review.create({
      title: 'Love the book but needs an update',
      content:
        'I absolutely loved this book, so well-written and and such a nice print.',
      rating: 4
    })
>>>>>>> master
  ])

  const html = await Category.create({name: 'HTML'})
  const css = await Category.create({name: 'CSS'})
  const cPlusPlus = await Category.create({name: 'C++'})
  const javascript = await Category.create({name: 'Javascript'})
  const general = await Category.create({name: 'General'})
  const beginner = await Category.create({name: 'Beginner'})
  const intermediate = await Category.create({name: 'Intermediate'})
  const advanced = await Category.create({name: 'Advanced'})

  const book1 = await Product.create({
    title: 'HTML and CSS: Design and Build Websites',
    author: 'Jon Duckett',
    description:
      'Every day, more and more people want to learn some HTML and CSS. Joining the professional web designers and programmers are new audiences who need to know a little bit of code at work (update a content management system or e–commerce store) and those who want to make their personal blogs more attractive. Many books teaching HTML and CSS are dry and only written for those who want to become programmers, which is why this book takes an entirely new approach.',
    price: 21.58,
    imageUrl:
      'https://dzvfs5sz5rprz.cloudfront.net/media/catalog/product/cache/1/image/1200x/040ec09b1e35df139433887a97daa66f/h/t/html_and_css_design_and_build_websites_book_1st_edition-1.jpg',

    inventory: 50
  })

  await html.addProduct(book1)
  await css.addProduct(book1)
  await beginner.addProduct(book1)

  const book2 = await Product.create({
    title: 'The C++ Programming Language, 4th Edition',
    author: 'Bjarne Stroustrup',
    description: `Bjarne (The Author) has been at the forefront of making C++ as stable as it is today. Being the Managing Director for Morgan Stanley puts him in a spot light of that any Coder wanting to learn more should aspire to.
        The 4th edition of this book has been rewritten from the ground up (unlike other others that simply update examples in their textbooks). The comprehensive update includes the anticipated C++11 standards. This ensure that anything you will read about in Strounstup’s, C++ Programming language, will be the most cutting edge information we have on C++ implementation.
        This book clarifies both syntax and semantics of the modern day C++ language. The beginner that wants to learn can go through earlier chapters as well. Though, for more advanced coders that want to sharpen their programming knowledge this will be a textbook that is definitely on your shelf at your office desk. `,
    price: 27.56,
    imageUrl:
      ' https://coderseye.com/wp-content/uploads/C11-programming-languge-stroustrup_.jpg',

    inventory: 44
  })

  await cPlusPlus.addProduct(book2)
  await beginner.addProduct(book2)
  await intermediate.addProduct(book2)
  await advanced.addProduct(book2)

  const book3 = await Product.create({
    title: 'You Don’t Know JS: Up and Going by Kyle Simpson',
    author: 'Kyle Simpson',
    description: `It’s easy to learn parts of JavaScript, but much harder to learn it completely—or even sufficiently—whether you’re new to the language or have used it for years. With the "You Don’t Know JS" book series, you’ll get a more complete understanding of JavaScript, including trickier parts of the language that many experienced JavaScript programmers simply avoid.
    The series’ first book, Up & Going, provides the necessary background for those of you with limited programming experience. By learning the basic building blocks of programming, as well as JavaScript’s core mechanisms, you’ll be prepared to dive into the other, more in-depth books in the series—and be well on your way toward true JavaScript.
    With this book you will:
    Learn the essential programming building blocks, including operators, types, variables, conditionals, loops, and functions
    Become familiar with JavaScript's core mechanisms such as values, function closures, this, and prototypes
    Get an overview of other books in the series—and learn why it’s important to understand all parts of JavaScript`,
    price: 2.99,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/41L18FvA5rL._SX331_BO1,204,203,200_.jpg',
    inventory: 35
  })

  await javascript.addProduct(book3)
  await beginner.addProduct(book3)

  const book4 = await Product.create({
    title: 'Code: The Hidden Language of Computer Hardware and Software',
    author: 'Charles Petzold',
    description: `"What do flashlights, the British invasion, black cats, and seesaws have to do with computers? In CODE, they show us the ingenious ways we manipulate language and invent new means of communicating with each other. And through CODE, we see how this ingenuity and our very human compulsion to communicate have driven the technological innovations of the past two centuries.
    Using everyday objects and familiar language systems such as Braille and Morse code, author Charles Petzold weaves an illuminating narrative for anyone who’s ever wondered about the secret inner life of computers and other smart machines.
    It’s a cleverly illustrated and eminently comprehensible story—and along the way, you’ll discover you’ve gained a real context for understanding today’s world of PCs, digital media, and the Internet. No matter what your level of technical savvy, CODE will charm you—and perhaps even awaken the technophile within."`,
    price: 20.05,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/310WZuKyEUL._SX334_BO1,204,203,200_.jpg',
    inventory: 23
  })

  await general.addProduct(book4)
  await beginner.addProduct(book4)

  const book5 = await Product.create({
    title: 'The Pragmatic Programmer: From Journeyman to Master',
    author: 'Andrew Hunt and David Thomas',
    description: `Lessons on how to improve productivity, accuracy, and job satisfaction. Designed for an audience from the new coder to the experienced programmer or manager. Develop the attitude that helps you become the best at what you do. The purpose of this book is to bring you from the coder without a foundation or discipline for programming into someone who has a strong understanding of variables, objects, algorithms, and data structures. It is a smooth transition from this book into any coding language, and for this reason we recommend this book as not a language book but a primer in every programming language.`,
    price: 16.76,
    imageUrl:
      'https://coderseye.com/wp-content/uploads/the-pragmatic-programmer-andrew-hunt.jpg?x59762',
    inventory: 18
  })

  await general.addProduct(book5)
  await beginner.addProduct(book5)
  await intermediate.addProduct(book5)
  await advanced.addProduct(book5)

  // Product.create({title: "",
  // author: "",
  // description: ``,
  // price: ,
  // imageUrl: '',
  // inventory: ,
  // category:
  // })

  const book6 = await Product.create({
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
<<<<<<< HEAD
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
=======
>>>>>>> master

  await html.addProduct(book6)
  await beginner.addProduct(book6)

<<<<<<< HEAD
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
=======
  ///Orders
>>>>>>> master

  const orders = await Promise.all([
    Order.create({status: 'complete', userId: 1}),
    Order.create({status: 'processing', userId: 1}),
    Order.create({status: 'processing', userId: 2}),
    Order.create({status: 'complete', userId: 2}),
    Order.create({status: 'complete', userId: 1})
  ])

  const productOrders = await Promise.all([
    ProductOrder.create({
      unitPrice: 299,
      quantity: 2,
      productId: 3,
      orderId: 1
    }),
    ProductOrder.create({
      unitPrice: 1676,
      quantity: 3,
      productId: 5,
      orderId: 1
    }),
    ProductOrder.create({
      unitPrice: 2005,
      quantity: 1,
      productId: 4,
      orderId: 5
    })
  ])

  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
<<<<<<< HEAD

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

=======
  console.log(`seeded ${users.length} users and ${reviews.length} reviews`)
>>>>>>> master
  // console.log(
  //   `seeded ${users.length} users, ${categories.length} categories and ${
  //     products.length
  //   } products`
  // )
<<<<<<< HEAD
=======

>>>>>>> master
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
    const reviews = await Review.findAll()
    const products = await Product.findAll()
    const users = await User.findAll()

    const review1 = reviews[0].setProduct(products[0])
    const review2 = reviews[1].setProduct(products[1])
    const review3 = reviews[2].setProduct(products[2])
    const review4 = reviews[3].setProduct(products[3])
    const review5 = reviews[4].setProduct(products[3])
    const review6 = reviews[5].setProduct(products[2])
    const review7 = reviews[6].setProduct(products[1])
    const review8 = reviews[7].setProduct(products[0])
    const reviewUser1 = reviews[0].setUser(users[0])
    const reviewUser2 = reviews[1].setUser(users[1])
    const reviewUser3 = reviews[2].setUser(users[2])
    const reviewUser4 = reviews[3].setUser(users[0])
    const reviewUser5 = reviews[4].setUser(users[1])
    const reviewUser6 = reviews[6].setUser(users[2])
    const reviewUser7 = reviews[7].setUser(users[0])
    const reviewUser8 = reviews[5].setUser(users[1])

    await Promise.all([
      review1,
      review2,
      review3,
      review4,
      review5,
      review6,
      review7,
      review8,
      reviewUser1,
      reviewUser2,
      reviewUser3,
      reviewUser4,
      reviewUser5,
      reviewUser6,
      reviewUser7,
      reviewUser8
    ])
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
