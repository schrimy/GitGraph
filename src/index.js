import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import './index.css'
import App from './App'
import reducer from './reducers'
import middleware from './middleware'
import 'jquery/dist/jquery.js'
import 'bootstrap/js/dist/util.js'
import 'bootstrap/dist/css/bootstrap.css'
import './styles/main.scss'

const store = createStore(reducer, middleware)

ReactDOM.render(
  <Provider store={ store }>
      <App />
  </Provider>,
  document.getElementById('root')
)
