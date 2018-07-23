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
        type: Sequelize.FLOAT, allowNull: false
    },
    imageUrl:{
      type: Sequelize.STRING,
      defaultValue: 'https://image.flaticon.com/icons/svg/37/37631.svg',
    },
    quantity: {
        type: Sequelize.INTEGER
    },
    category: {
        type: Sequelize.STRING
    }

});

module.exports = Product;

