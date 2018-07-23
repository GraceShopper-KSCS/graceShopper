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
    quantity: {
        type: Sequelize.INTEGER
    }

});

module.exports = Product;

