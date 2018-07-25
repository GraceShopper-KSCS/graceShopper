const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  author: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    get() {
      return (0.01 * this.getDataValue('price')).toFixed(2);
    },
    set(val) {
      this.setDataValue('price', val * 100)
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://image.flaticon.com/icons/svg/37/37631.svg'
  },
  inventory: {
    type: Sequelize.INTEGER
  }
})

module.exports = Product

