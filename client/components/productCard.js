import React, { Component } from 'react';


class ProductCard extends Component {
    constructor() {
        super()
    }

    render() {
        const product = this.props.product
        return (
            <div>
                <h3>
                    {product.title}
                </h3>
                <img src={product.imageUrl} />
            </div>

        )

    }
}


export default ProductCard;
