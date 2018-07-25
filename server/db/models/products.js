const Sequelize = require('sequelize')
const db = require('../db')
const Review = require('./reviews')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://image.flaticon.com/icons/svg/37/37631.svg'
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  category: {
    type: Sequelize.STRING
  }
})
Product.prototype.averageRating = async function() {
  const reviews = await Review.findAll({
    where: {productid: this.id}
  })
  if (reviews) {
    const total = reviews.reduce((sum, review) => sum + review.rating, 0)
    const length = reviews.length
    return total / length
  }
}

module.exports = Product
