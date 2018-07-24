import React, {Component} from 'react'

class SelectCatagory extends Component {
  constructor() {
    super()
    this.state = {
      catagory: ''
    }
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render() {
    const catagory = this.state.catagory
    return (
      <div>
        <form>
          <label>Choose catagory</label>
          <select name="catagory" value={catagory}>
            <option value="">Select catagory</option>
            <option value="beginner">Beginner</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="javascript">Javascript</option>
            <option value="general">General</option>
            <option value="experienced">Experienced</option>
            <option value="intermediate">Intermediate</option>
          </select>
        </form>
      </div>
    )
  }
}

export default ProductCard
