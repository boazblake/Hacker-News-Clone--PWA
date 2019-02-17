import m from 'mithril'
import Layout from './Layout.js'

const loadData = (model) => (url) => (route) =>
  m.request({ url, method: 'GET' }).then((data) => (model.data[route] = data))

const Posts = ({ attrs: { model } }) => {
  let route = m.route.get()
  return {
    view: () =>
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
            width: '100%',
          },
        },
        model.data[route].map((item, idx) =>
          m(
            '',
            {
              style: {
                flexGrow: 1,
                margin: '10px',
                backgroundColor: 'rgba(41,18,185 ,.2)',
                width: '150px',
                height: '150px',
              },
              key: idx,
            },
            item.title
          )
        )
      ),
  }
}

const routes = (model) => {
  return {
    '/posts': {
      onmatch: (_, path) => {
        model.state.route = path
        model.data[path] ? model.data[path] : (model.data[path] = [])
        loadData(model)(model.reqs.urls[path])(path)
      },
      render: () => m(Layout(model), m(Posts, { model })),
    },
  }
}

export default routes
