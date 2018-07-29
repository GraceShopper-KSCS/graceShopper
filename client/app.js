import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import {Redirect} from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      {/* <Redirect to="/books" /> */}
    </div>
  )
}

export default App
