import React from 'react'
import ProductCard from './productCard'

const Order = props => {
  console.log(props)
  const order = props.order
  const products = order.products
  return (
    <div>
      <h4>Order ID: {order.id}</h4>
      <h4>Order Status: {order.status}</h4>

      {products.map(product => (
        <div>
          <ProductCard key={product.id} product={product} />
          <h5>Quantity: {product.productorder.quantity}</h5>
        </div>
      ))}
    </div>
  )
}

export default Order
