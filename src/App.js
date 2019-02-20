import m from 'mithril'
import Layout from './Layout.js'

const isEmpty = data => data.length == 0

const loadData = model => url => route =>
  m
    .request({
      url,
      method: 'GET',
    })
    .then(data => {
      model.data[route] = data
    })

const getData = model => path => {
  model.state.route = path
  model.data[path] ? model.data[path] : (model.data[path] = [])
  if (isEmpty(model.data[path])) loadData(model)(model.reqs.urls[path])(path)
  return model
}

const Posts = ({
  attrs: {
    item: { title, body },
  },
}) => {
  console.log(title, body)
  return {
    view: () =>
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
        },
        [m('h1', title), m('p', body)]
      ),
  }
}

const Comments = ({
  attrs: {
    item: { email, name, body },
  },
}) => {
  return {
    view: () =>
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
        },
        [m('h1', name), m('p', email), m('p', body)]
      ),
  }
}

const Albums = ({
  attrs: {
    item: { title },
  },
}) => {
  return {
    view: () =>
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
        },
        [m('h1', title)]
      ),
  }
}

const Photos = ({
  attrs: {
    item: { email, name, body },
  },
}) => {
  return {
    view: () =>
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
        },
        [m('h1', name), m('p', email), m('p', body)]
      ),
  }
}

const Todos = ({
  attrs: {
    item: { completed, title },
  },
}) => {
  return {
    view: () =>
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
        },
        [
          m('h1', title),
          m(
            'input[type=checkbox]',
            { onclick: () => (completed = !completed), checked: completed },
            'Done'
          ),
        ]
      ),
  }
}

const Users = ({
  attrs: {
    item: { email, name, body },
  },
}) => {
  return {
    view: () =>
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
        },
        [m('h1', name), m('p', email), m('p', body)]
      ),
  }
}

const toComponent = type => {
  switch (type) {
  case '/posts':
    return Posts
  case '/comments':
    return Comments
  case '/albums':
    return Albums
  case '/photos':
    return Photos
  case '/todos':
    return Todos
  case '/users':
    return Users
  }
}

const Container = () => {
  return {
    view: ({ attrs: { model } }) => {
      let Component = toComponent(model.state.route)
      return m(
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
          return m(Component, {
            key: idx,
            item: item,
          })
        })
      )
    },
  }
}

export const App = model => {
  return {
    '/posts': {
      onmatch: (_, path) => getData(model)(path),
      render: () =>
        m(
          Layout,
          {
            model,
          },
          m(Container, {
            model,
          })
        ),
    },
    '/comments': {
      onmatch: (_, path) => getData(model)(path),
      render: () =>
        m(
          Layout,
          {
            model,
          },
          m(Container, {
            model,
          })
        ),
    },
    '/albums': {
      onmatch: (_, path) => getData(model)(path),
      render: () =>
        m(
          Layout,
          {
            model,
          },
          m(Container, {
            model,
          })
        ),
    },
    '/photos': {
      onmatch: (_, path) => getData(model)(path),
      render: () =>
        m(
          Layout,
          {
            model,
          },
          m(Container, {
            model,
          })
        ),
    },
    '/todos': {
      onmatch: (_, path) => getData(model)(path),
      render: () => {
        return m(
          Layout,
          {
            model,
          },
          m(Container, {
            model,
          })
        )
      },
    },
    '/users': {
      onmatch: (_, path) => getData(model)(path),
      render: () =>
        m(
          Layout,
          {
            model,
          },
          m(Container, {
            model,
          })
        ),
    },
  }
}
