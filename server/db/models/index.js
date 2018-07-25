const User = require('./user')
const Product = require('./products')
const Order = require('./order')
const Review = require('./reviews')
const Category = require('./category')
const ProductOrder = require('./productOrder')
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
Review.belongsTo(Product)
Product.hasMany(Review)
Review.belongsTo(User)
User.hasMany(Review)
Order.belongsTo(User)
User.hasMany(Order)
Product.belongsToMany(Order, { through: ProductOrder })
Order.belongsToMany(Product, { through: ProductOrder })
Product.belongsToMany(Category, { through: 'CategoryProduct' })
Category.belongsToMany(Product, { through: 'CategoryProduct' })


module.exports = {
  User, Product, Order, Review, ProductOrder, Category


}
