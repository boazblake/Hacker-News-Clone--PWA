import m from 'mithril'
import Layout from './Layout.js'
import { isEmpty, init, infiniteScroll } from './helpers.js'
import { animateEntrance } from './animations.js'

const IsLoading = m('.holder', { style: { width: '100%', height: '100%' } }, [
  m('.preloader', [ m('div'), m('div'), m('div'), m('div'), m('div'), m('div'), m('div') ]),
])

const itemStyle = ({ r, g, b }) => ({
  flexFlow: 'column wrap',
  backgroundColor: `rgba(${r},${g},${b} ,.2)`,
})

const componentStyle = ({ r, g, b }) => ({
  backgroundColor: `rgba(${r},${g},${b} ,.1)`,
})

const Post = () => {
  return {
    view: ({ attrs: { key, model, item: { title, body } } }) => {
      let itemStyles = itemStyle(model.mode)
      return m(
        '.grid-item.post',
        {
          id: `post-${key}`,
          style: itemStyles,
        },
        [ m('h1', title), m('p', body) ]
      )
    },
  }
}

const Comment = () => {
  return {
    view: ({ attrs: { model, key, item: { email, name, body } } }) => {
      let itemStyles = itemStyle(model.mode)
      return m(
        '.grid-item.comment',
        {
          id: `comment-${key}`,
          style: itemStyles,
        },
        [ m('h1', name), m('p', email), m('p', body) ]
      )
    },
  }
}

const Album = () => {
  return {
    view: ({ attrs: { key, model, item: { title } } }) => {
      let itemStyles = itemStyle(model.mode)
      return m(
        '.grid-item.album',
        {
          id: `album-${key}`,
          style: itemStyles,
        },
        [ m('h1', title) ]
      )
    },
  }
}

const Photo = () => {
  return {
    view: ({ attrs: { key, model, item: { title, thumbnailUrl, url } } }) => {
      let itemStyles = itemStyle(model.mode)
      let src = thumbnailUrl
      return m(
        '.grid-item.photo',
        {
          id: `photo-${key}`,
          style: { ...itemStyles, display: 'flex' },
        },
        [
          m('h1', { style: { padding: '4px', right: 'auto', flex: 3 } }, title),
          m('img', {
            onclick: () => {
              src = url
            },
            style: { left: 'auto', flex: '1 150px' },
            src,
          }),
        ]
      )
    },
  }
}

const Todo = ({ attrs: { item: { completed } } }) => {
  return {
    view: ({ attrs: { key, model, item: { title } } }) => {
      let itemStyles = itemStyle(model.mode)
      return m(
        '.grid-item.todo',
        {
          id: `todo-${key}`,
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

const User = () => {
  return {
    view: ({ attrs: { key, model, item: { email, name, phone, username, website } } }) => {
      let itemStyles = itemStyle(model.mode)
      return m(
        '.grid-item.user',
        {
          id: `user-${key}`,
          key,
          style: itemStyles,
        },
        [
          m('.', [ m('label.left', { for: 'name' }, 'name'), m('p.right', { name: 'name' }, name) ]),
          m('.', [ m('label.left', { for: 'email' }, 'email'), m('p.right', { name: 'email' }, email) ]),
          m('.', [ m('label.left', { for: 'phone' }, 'phone'), m('p.right', { name: 'phone' }, phone) ]),
          m('.', [ m('label.left', { for: 'username' }, 'username'), m('p.right', { name: 'username' }, username) ]),
          m('.', [ m('label.left', { for: 'website' }, 'website'), m('p.right', { name: 'website' }, website) ]),
        ]
      )
    },
  }
}

const toComponent = type => {
  switch (type) {
  case '/posts':
    return Post
  case '/comments':
    return Comment
  case '/albums':
    return Album
  case '/photos':
    return Photo
  case '/todos':
    return Todo
  case '/users':
    return User
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
          style: componentStyle(model.mode),
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
