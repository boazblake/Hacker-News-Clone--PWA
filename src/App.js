import m from 'mithril'
import Layout from './Layout.js'
import { isEmpty, init, infiniteScroll } from './helpers.js'
import { animateEntrance } from './animations.js'

const IsLoading = m('.holder', { style: { width: '100%', height: '100%' } }, [
  m('.preloader', [ m('div'), m('div'), m('div'), m('div'), m('div'), m('div'), m('div') ]),
])

const itemStyle = theme => ({
  flexFlow: 'column wrap',
  backgroundColor: theme,
})

const componentStyle = theme => ({
  backgroundColor: theme,
})

const Posts = () => {
  return {
    view: ({ attrs: { model, item: { title, body } } }) => {
      let itemStyles = itemStyle(model.themes(model.mode).item)
      return m(
        '.grid-item',
        {
          id: 'posts',
          style: itemStyles,
        },
        [ m('h1', title), m('p', body) ]
      )
    },
  }
}

const Comments = () => {
  return {
    view: ({ attrs: { model, item: { email, name, body } } }) => {
      let itemStyles = itemStyle(model.themes(model.mode).item)
      return m(
        '.grid-item',
        {
          id: 'comments',
          style: itemStyles,
        },
        [ m('h1', name), m('p', email), m('p', body) ]
      )
    },
  }
}

const Albums = () => {
  return {
    view: ({ attrs: { model, item: { title } } }) => {
      let itemStyles = itemStyle(model.themes(model.mode).item)
      return m(
        '.grid-item',
        {
          id: 'albums',
          style: itemStyles,
        },
        [ m('h1', title) ]
      )
    },
  }
}

const Photos = ({ attrs: { item: { thumbnailUrl, url } } }) => {
  let state = {
    isSmall: true,
    small: thumbnailUrl,
    large: url,
  }

  return {
    view: ({ attrs: { model, item: { title } } }) => {
      let itemStyles = itemStyle(model.themes(model.mode).item)
      return m(
        '.grid-item',
        {
          id: 'photos',
          style: { ...itemStyles, display: 'flex' },
        },
        [
          m('h1', { style: { padding: '4px', right: 'auto', flex: 3 } }, title),
          m('img', {
            onclick: () => {
              state.isSmall = !state.isSmall
            },
            style: { left: 'auto', flex: '1 150px' },
            src: state.isSmall ? state.small : state.large,
          }),
        ]
      )
    },
  }
}

const Todos = ({ attrs: { key, model, item: { title, completed } } }) => {
  return {
    view: () => {
      let itemStyles = itemStyle(model.themes(model.mode).item)
      return m(
        '.grid-item',
        {
          id: 'todos',
          style: itemStyles,
          key,
        },
        [
          m(
            'input[type=checkbox].fancyCheckBox',
            {
              onclick: () => {
                completed = !completed
              },
              checked: completed,
            },
            'Done'
          ),
          m('h1', title),
        ]
      )
    },
  }
}

const Users = () => {
  return {
    view: ({ attrs: { key, model, item: { email, name, phone, username, website } } }) => {
      let itemStyles = itemStyle(model.themes(model.mode).item)
      return m(
        '.grid-item',
        {
          id: 'users',
          key,
          style: itemStyles,
        },
        m('code', [
          m('.grid-item', {}, [ m('label', { for: 'name' }, 'name'), m('h1', { name: 'name' }, name) ]),
          m('.grid-item', {}, [ m('label', { for: 'email' }, 'email'), m('p', { name: 'email' }, email) ]),
          m('.grid-item', {}, [ m('label', { for: 'phone' }, 'phone'), m('p', { name: 'phone' }, phone) ]),
          m('.grid-item', {}, [ m('label', { for: 'username' }, 'username'), m('p', { name: 'username' }, username) ]),
          m('.grid-item', {}, [ m('label', { for: 'website' }, 'website'), m('p', { name: 'website' }, website) ]),
        ])
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
      let route = model.state.route
      let Current = toComponent(route)
      let data = model.data[route].data
      return m(
        'section.component',
        {
          id: 'component',
          style: componentStyle(model.themes(model.mode).component),
          route: model.state.route,
          onscroll: infiniteScroll(model),
        },
        isEmpty(data)
          ? m('', { style: { width: '80vw' } }, IsLoading)
          : data.map((item, idx) =>
            m(Current, {
              oncreate: animateEntrance(idx),
              key: idx,
              item: item,
              model,
            })
          )
      )
    },
  }
}

export const App = model => {
  return {
    '/posts': {
      onmatch: (_, path) => init(model)(path),
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
      onmatch: (_, path) => init(model)(path),
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
      onmatch: (_, path) => init(model)(path),
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
      onmatch: (_, path) => init(model)(path),
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
      onmatch: (_, path) => init(model)(path),
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
      onmatch: (_, path) => init(model)(path),
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
