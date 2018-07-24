const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const books = await Product.findAll();
    res.json(books)
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const book = await Product.findById(id);
    res.json(book)
  } catch (err) {
    next(err);
  }
});
