import m from 'mithril'
import Layout from './Layout.js'

const loadData = model => url => route =>
  m.request({ url, method: 'GET' }).then(data => {
    console.log('data', data)
    model.data[route] = data
  })

const Container = () => {
  return {
    view: ({ attrs: { model } }) =>
      m(
        'section.posts',
        {
          style: {
            display: 'flex',
            flexFlow: 'wrap',
            justifyContent: 'space-around',
            overflowY: 'scroll',
            padding: '10px',
            backgroundColor: 'rgba(41,128,185 ,.1)',
            height: '75vh',
            width: '100%'
          }
        },
        model.data[model.state.route].map((item, idx) => {
          console.log(item)
          return m(
            '',
            {
              style: {
                flexGrow: 1,
                margin: '10px',
                backgroundColor: 'rgba(41,18,185 ,.2)',
                width: '150px',
                height: '150px'
              },
              key: idx
            },
            item.title
          )
        })
      )
  }
}

const routes = model => {
  return {
    '/posts': {
      onmatch: (_, path) => {
        model.state.route = path
        model.data[path] ? model.data[path] : (model.data[path] = [])
        console.log('posts', model.data[path])
        loadData(model)(model.reqs.urls[path])(path)
      },
      render: () => m(Layout, { model }, m(Container, { model }))
    },
    '/comments': {
      onmatch: (_, path) => {
        model.state.route = path
        model.data[path] ? model.data[path] : (model.data[path] = [])
        console.log('commenrs', model.data[path])
        loadData(model)(model.reqs.urls[path])(path)
      },
      render: () => m(Layout, { model }, m(Container, { model }))
    },
    '/albums': {
      onmatch: (_, path) => {
        model.state.route = path
        model.data[path] ? model.data[path] : (model.data[path] = [])
        console.log('albums', model.data[path])
        loadData(model)(model.reqs.urls[path])(path)
      },
      render: () => m(Layout, { model }, m(Container, { model }))
    },
    '/photos': {
      onmatch: (_, path) => {
        model.state.route = path
        model.data[path] ? model.data[path] : (model.data[path] = [])
        console.log('photos', model.data[path])
        loadData(model)(model.reqs.urls[path])(path)
      },
      render: () => m(Layout, { model }, m(Container, { model }))
    },
    '/todos': {
      onmatch: (_, path) => {
        model.state.route = path
        model.data[path] ? model.data[path] : (model.data[path] = [])
        console.log('todos', model.data[path])
        loadData(model)(model.reqs.urls[path])(path)
      },
      render: () => m(Layout, { model }, m(Container, { model }))
    },
    '/users': {
      onmatch: (_, path) => {
        model.state.route = path
        model.data[path] ? model.data[path] : (model.data[path] = [])
        console.log('users', model.data[path])
        loadData(model)(model.reqs.urls[path])(path)
      },
      render: () => m(Layout, { model }, m(Container, { model }))
    }
  }
}

export default routes
