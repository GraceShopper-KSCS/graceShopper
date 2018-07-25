import React from 'react'

const ProductForm = props => {
  const state = props.state
  return (
    <form onSubmit={props.handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        name="title"
        onChange={props.handleChange}
        value={state.name}
      />
      <label htmlFor="author">Author:</label>
      <input
        type="text"
        name="author"
        onChange={props.handleChange}
        value={state.author}
      />
      <label htmlFor="description">Description:</label>
      <input
        type="text"
        name="description"
        onChange={props.handleChange}
        value={state.description}
      />
      <label htmlFor="price">Price:</label>
      <input
        type="text"
        name="price"
        onChange={props.handleChange}
        value={state.price}
      />
      <label htmlFor="imageUrl">imageUrl:</label>
      <input
        type="text"
        name="imageUrl"
        onChange={props.handleChange}
        value={state.imageUrl}
      />
      <label htmlFor="inventory">Inventory:</label>
      <input
        type="text"
        name="inventory"
        onChange={props.handleChange}
        value={state.inventory}
      />
      <label htmlFor="category">Category:</label>
      <input
        type="text"
        name="category"
        onChange={props.handleChange}
        value={state.category}
      />
      <button type="submit">Submit</button>
    </form>
  )
}

export default ProductForm
