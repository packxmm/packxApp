import React from 'react'
import { Provider } from 'react-redux'
import store from 'utils/store'
import 'utils/ignore'
import Router from './routes'

const App = () => {
  // state
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  )
}

export default App
