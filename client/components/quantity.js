import React, { Component } from 'react';

class Quantity extends Component {
    constructor() {
        super();
        this.state = {
            clicks: 0
        };
        this.IncrementItem = this.IncrementItem.bind(this)
        this.DecreaseItem = this.DecreaseItem.bind(this)
    }
    IncrementItem() {
        this.setState({ clicks: this.state.clicks + 1 });
    }

    DecreaseItem() {
        this.setState({ clicks: this.state.clicks - 1 });
    }

    render() {
        return (
            <div>
                <button onClick={this.IncrementItem}>+</button>
                <button disabled={this.state.clicks <= 0} onClick={this.DecreaseItem}>-</button>
                <h2>{this.state.clicks}</h2>
            </div>
        );
    }
}

export default Quantity;
