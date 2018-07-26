import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import {Redirect} from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Redirect to="/books" />
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
