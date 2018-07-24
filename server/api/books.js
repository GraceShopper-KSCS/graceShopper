const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const books = await Product.findAll()
    res.json(books)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const book = await Product.findById(id)
    res.json(book)
  } catch (err) {
    next(err)
  }
})

router.get('/filter/:category', async (req, res, next) => {
  try {
    const category = req.params.category
    const books = await Product.findAll({
      where: {
        category
      }
    })
    res.json(books)
  } catch (err) {
    next(err)
  }
})

//Routes only accessible to Admin Users

router.post('/', async (req, res, next) => {
  try {
    const newBook = await Product.create(req.body)
    res.status(201).json(newBook)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const book = await Product.findById(req.params.id)
    const updatedBook = await book.update(req.body)
    res.json(updatedBook)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const book = await Product.destroy(req.params.id)
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
