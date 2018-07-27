import React, { Component } from 'react';
import axios from 'axios'

class Quantity extends Component {
    constructor() {
        super();
        this.state = {
            clicks: 0
        };
        this.IncrementItem = this.IncrementItem.bind(this)
        this.DecreaseItem = this.DecreaseItem.bind(this)
    }
    componentDidMount() {
        this.setState({ clicks: this.props.product.quantity })
    }

    async IncrementItem() {
        this.setState({ clicks: this.state.clicks + 1 });
        const res = await axios.put(`/api/cart/incquantity/${this.props.product.id}`)
        this.setState({ clicks: res.data })
    }

    async DecreaseItem() {
        this.setState({ clicks: this.state.clicks - 1 });
        const res = await axios.put(`/api/cart/decquantity/${this.props.product.id}`)
        this.setState({ clicks: res.data })
    }

    render() {
        return (
            <div>
                <button onClick={this.IncrementItem}>+</button>
                <button disabled={this.state.clicks <= 1} onClick={this.DecreaseItem}>-</button>
                <h2>{this.state.clicks}</h2>
            </div>
        );
    }
}

export default Quantity;
