// import {expect} from 'chai'
// import React from 'react'
// import enzyme, {shallow} from 'enzyme'
// import Adapter from 'enzyme-adapter-react-16'
// import {Reviews} from './reviews'

// const adapter = new Adapter()
// enzyme.configure({adapter})

// describe('Reviews', () => {
//   let shallowReviews
//   let reviews = [
//     {
//       rating: 1,
//       title: '',
//       content: '',
//       productId: 1,
//       user: {email: 'cody@email.com'}
//     }
//   ]

//   beforeEach(() => {
//     shallowReviews = shallow(<Reviews reviews={reviews} />)
//   })

//   it('renders the email in an h6', () => {
//     expect(shallowReviews.find('h6').text()).to.be.equal('By:cody@email.com')
//     expect(shallowReviews.find('h5').children()).to.have.length(3)
//   })
// })
