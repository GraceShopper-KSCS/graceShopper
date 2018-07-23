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
