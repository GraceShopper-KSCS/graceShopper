const router = require('express').Router()
const {User, Order} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

//ORDER ROUTES BY USER ID
router.get('/:userId/orders', async (req, res, next) => {
  try {
    const id = req.params.userId
    const orders = await Order.findAll({
      where: {
        userId: id,
        status: 'completed'
      }
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

//REVIEWS ROUTES BY USER ID

// router.get('/userId/reviews', async(req,res,next)=>{
//   try{
//     const id = req.params.userId
//     const reviews = await Review.findAll({where:{
//       userId: id
//     }})
//     res.json(reviews)

//   }catch(err){
//     next(err)
//   }
// })

// router.put('/:userId/reviews/:reviewId', async(req,res,next)=>{
//   try{
//     const id = req.params.reviewId
//     const review = await Review.findById(id)
//     const updatedReview = await review.update(req.body)
//     res.json(updatedReview)
//   }catch(err){
//     next(err)
//   }
// })

// router.delete('/:userId/reviews/:reviewId', async(req,res,next)=>{
//   try{
//     const id = req.params.reviewId
//     await Review.destroy({where:{id}})
//     res.status(204).end()
//   }catch(err){
//     next(err)
//   }
// })
