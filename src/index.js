// index.jsx
import m from 'mithril'
const root = document.getElementById('app')

if (module.hot) {
  module.hot.accept()
}

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!')
}

const url = (item) => `https://jsonplaceholder.typicode.com${item}`

const http = (url) => (method) => (data = null) => m.request({ url, method, data })

const options = [ '/posts', '/comments', '/albums', '/photos', '/todos', '/users' ]

const urls = options.reduce((req, item) => {
  req[item] = url(item)
  return req
}, {})

const reqs = {
  urls,
  http,
}

// Styles
import './index.css'
import './animations.css'

import routes from './App.js'

const model = {
  sidebar: { isOpen: true },
  numItems: 1,
  data: {},
  state: { url: '', route: '' },
  reqs,
}

m.route(root, '/posts', routes(model))
