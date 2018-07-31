/* eslint-env mocha, chai */

const { expect } = require('chai')
const { db, Product, Category } = require('./index')

describe('Product model', () => {
  beforeEach(() => db.sync({ force: true }))

  describe('column definitions and validations', () => {
    it('has a `title`,`author`,`description`,`price`,`inventory`', async () => {
      const newBook = await Product.create({
        title: 'HTML and CSS: Design and Build Websites',
        author: 'Jon Duckett',
        description: 'Every day, more and more people want to learn some HTML and CSS. Joining the professional web designers and programmers are new audiences who need to know a little bit of code at work (update a content management system or e–commerce store) and those who want to make their personal blogs more attractive. Many books teaching HTML and CSS are dry and only written for those who want to become programmers, which is why this book takes an entirely new approach.',
        price: 2158.12,
        inventory: 50

      })

      expect(newBook.title).to.equal('HTML and CSS: Design and Build Websites')
      expect(newBook.author).to.deep.equal('Jon Duckett')
      expect(newBook.description).to.deep.equal('Every day, more and more people want to learn some HTML and CSS. Joining the professional web designers and programmers are new audiences who need to know a little bit of code at work (update a content management system or e–commerce store) and those who want to make their personal blogs more attractive. Many books teaching HTML and CSS are dry and only written for those who want to become programmers, which is why this book takes an entirely new approach.')
      expect(newBook.price).to.equal(2158.12)
      expect(newBook.inventory).to.equal(50)
    })

    it('`title` is required', async () => {
      const newBook = Product.build()
      return newBook.validate()
        .then(
          () => {
            throw new Error('Validation should have failed!')
          },
          (err) => {
            expect(err).to.be.an('error')
          }
        )
    })

    it('has a many-many relationship with categories', async () => {
      const category = await Category.create({ name: 'HTML' })
      const product = await Product.create({
        title: 'HTML and CSS: Design and Build Websites',
        author: 'Jon Duckett',
        description: 'Every day, more and more people want to learn some HTML and CSS. Joining the professional web designers and programmers are new audiences who need to know a little bit of code at work (update a content management system or e–commerce store) and those who want to make their personal blogs more attractive. Many books teaching HTML and CSS are dry and only written for those who want to become programmers, which is why this book takes an entirely new approach.',
        price: 2158.12,
        inventory: 50

      })

      await category.addProduct(product)
      const product1 = await category.getProducts()
      expect(product1).to.be.an('array')
      expect(product1.length).to.equal(1)
      expect(product1[0].title).to.equal('HTML and CSS: Design and Build Websites')
    })
  })
})




