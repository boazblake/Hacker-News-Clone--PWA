import m from 'mithril'
import Layout from './Layout.js'

const isEmpty = data => data.length == 0

const toVM = item => {
  console.log(item)
  return item
}

const loadData = model => url => route =>
  m.request({ url, method: 'GET' }).then(data => {
    model.data[route] = data
  })

const getData = model => path => {
  model.state.route = path
  model.data[path] ? model.data[path] : (model.data[path] = [])
  if (isEmpty(model.data[path])) loadData(model)(model.reqs.urls[path])(path)
  return model
}

const Item = ({ attrs: item, idx }) => {
  let dto = JSON.stringify(item, null, 4)
  // console.log('dto', dto)
  return {
    view: ({ attrs: item, idx, model }) => {
      return m(
        '',
        {
          style: {
            flexGrow: 1,
            margin: '10px',
            backgroundColor: 'rgba(41,18,185 ,.2)',
            width: '150px',
            height: '150px',
          },
        },
        dto
      )
    },
  }
}

const Container = () => {
  return {
    view: ({ attrs: { model } }) =>
      m(
        'section.container',
        {
          style: {
            display: 'flex',
            flexFlow: 'wrap',
            justifyContent: 'space-around',
            overflowY: 'scroll',
            overflowX: 'hidden',
            padding: '10px',
            backgroundColor: 'rgba(41,128,185 ,.1)',
            height: '75vh',
          },
        },
        model.data[model.state.route].map((item, idx) => {
          return m(Item, { key: idx, item })
        })
      ),
  }
}

export const App = model => {
  return {
    '/posts': {
      onmatch: (_, path) => getData(model)(path),
      render: () => m(Layout, { model }, m(Container, { model })),
    },
    '/comments': {
      onmatch: (_, path) => getData(model)(path),
      render: () => m(Layout, { model }, m(Container, { model })),
    },
    '/albums': {
      onmatch: (_, path) => getData(model)(path),
      render: () => m(Layout, { model }, m(Container, { model })),
    },
    '/photos': {
      onmatch: (_, path) => getData(model)(path),
      render: () => m(Layout, { model }, m(Container, { model })),
    },
    '/todos': {
      onmatch: (_, path) => getData(model)(path),
      render: a => {
        console.log('????', a)
        return m(Layout, { model }, m(Container, { model }))
      },
    },
    '/users': {
      onmatch: (_, path) => getData(model)(path),
      render: () => m(Layout, { model }, m(Container, { model })),
    },
  }
}
