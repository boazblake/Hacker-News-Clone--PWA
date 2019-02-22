import m from 'mithril'
import Layout from './Layout.js'

const IsLoading = m('.holder', [
  m('.preloader', [ m('div'), m('div'), m('div'), m('div'), m('div'), m('div'), m('div') ]),
])
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

const itemStyle = theme => ({
  flexGrow: 1,
  width: '400px',
  padding: '10px',
  margin: '10px',
  backgroundColor: theme,
})

const componentStyle = theme => ({
  position: 'relative',
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'space-around',
  overflowY: 'scroll',
  overflowX: 'hidden',
  padding: '10px',
  backgroundColor: theme,
})

const Posts = ({ attrs: { model, item: { title, body } } }) => {
  return {
    view: () => {
      let itemStyles = itemStyle(model.themes(model.mode).item)
      return m(
        '.Posts',
        {
          style: itemStyles,
        },
        [ m('h1', title), m('p', body) ]
      )
    },
  }
}

const Comments = ({ attrs: { model, item: { email, name, body } } }) => {
  return {
    view: () => {
      let itemStyles = itemStyle(model.themes(model.mode).item)
      return m(
        '.Comments',
        {
          style: itemStyles,
        },
        [ m('h1', name), m('p', email), m('p', body) ]
      )
    },
  }
}

const Albums = ({ attrs: { model, item: { title } } }) => {
  return {
    view: () => {
      let itemStyles = itemStyle(model.themes(model.mode).item)
      return m(
        '.Albums',
        {
          style: itemStyles,
        },
        [ m('h1', title) ]
      )
    },
  }
}

const Photos = ({ attrs: { model, item: { thumbnailUrl, title, url } } }) => {
  let state = {
    isSmall: true,
    small: thumbnailUrl,
    large: url,
  }

  return {
    view: () => {
      let itemStyles = itemStyle(model.themes(model.mode).item)
      return m(
        '.Photos',
        {
          style: { ...itemStyles, display: 'flex' },
        },
        [
          m('h1', { style: { padding: '4px', right: 'auto', flex: 3 } }, title),
          m('img', {
            onclick: () => (state.isSmall = !state.isSmall),
            style: { left: 'auto', flex: '1 150px' },
            src: state.isSmall ? state.small : state.large,
          }),
        ]
      )
    },
  }
}

const Todos = ({ attrs: { model, item: { completed, title } } }) => {
  return {
    view: () => {
      let itemStyles = itemStyle(model.themes(model.mode).item)
      return m(
        '.Todos',
        {
          style: itemStyles,
        },
        [
          m('h1', title),
          m('input[type=checkbox]', { onclick: () => (completed = !completed), checked: completed }, 'Done'),
        ]
      )
    },
  }
}

const Users = ({ attrs: { model, item: { address, company, email, name, phone, username, website } } }) => {
  const state = { isOpen: false }
  return {
    view: () => {
      let itemStyles = itemStyle(model.themes(model.mode).item)
      return m(
        '.Users',
        {
          style: {
            ...itemStyles,
            overflow: state.isOpen ? 'auto' : 'hidden',
            height: state.isOpen ? 'auto' : '150px',
          },
        },
        [
          m('h1', name),
          m('p', email),
          m(
            'button',
            { style: { height: '50px', width: '100%' }, onclick: () => (state.isOpen = !state.isOpen) },
            state.isOpen ? 'Close' : 'More...'
          ),
          m('pre', JSON.stringify(address, null, 2)),
          m('pre', JSON.stringify(company, null, 2)),
          m('p', phone),
          m('p', username),
          m('p', website),
        ]
      )
    },
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

const Component = () => {
  return {
    view: ({ attrs: { model } }) => {
      let Component = toComponent(model.state.route)
      let data = model.data[model.state.route]
      let componentStyles = componentStyle(model.themes(model.mode).component)
      return m(
        'section.Component',
        {
          style: componentStyles,
        },
        isEmpty(data)
          ? m('', { style: { width: '80vw' } }, IsLoading)
          : data.map((item, idx) => {
            return m(Component, {
              key: idx,
              item: item,
              model,
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
          m(Component, {
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
          m(Component, {
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
          m(Component, {
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
          m(Component, {
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
          m(Component, {
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
          m(Component, {
            model,
          })
        ),
    },
  }
}
