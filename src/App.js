import m from 'mithril'
import Layout from './components/Layout.js'
import { isEmpty, init, infiniteScroll, animateComponentEntrance } from './utils/index.js'

const IsLoading = m('.holder',  [
  m('.preloader', [ m('div'), m('div'), m('div'), m('div'), m('div'), m('div'), m('div') ]),
])

const Post = {
  view: ({ attrs: { key, item: { title, body } } }) => {
    return m(
      '.grid-item.row.post',
      {
        id: `post-${key}`,
      },
      [ m('h1.left', title), m('p.right', body) ]
    )
  },
}

const Comment = {
  view: ({ attrs: { key, item: { email, name, body } } }) => {
    return m(
      '.grid-item.row.comment',
      {
        id: `comment-${key}`,
      },
      [ m('h1.left', name), m('p.left', email), m('p.left', body) ]
    )
  },
}

const Album = {
  view: ({ attrs: { key, item: { title } } }) => {
    return m(
      '.grid-item.album',
      {
        id: `album-${key}`,
      },
      [ m('h1', title) ]
    )
  },
}

const Photo = {
  view: ({ attrs: { key, item: { title, thumbnailUrl } } }) => {
    return m(
      '.grid-item.photo',
      {
        id: `photo-${key}`,
      },
      [
        m('h1.left', title),
        m('img.right', {
          src: thumbnailUrl, alt: 'img',
        }),
      ]
    )
  },
}

const Todo = ({ attrs: { item: { completed } } }) => {
  return {
    view: ({ attrs: { key, item: { title } } }) => {
      return m(
        '.grid-item.todo',
        {
          id: `todo-${key}`,
          key,
        },
        [
          m('h1.left', title),
          m(
            'input[type=checkbox].right',
            {
              onclick: () => {
                completed = !completed
              },
              checked: completed,
            },
            'Done'
          ),
        ]
      )
    },
  }
}

const User = {
  view: ({  attrs: { key, item: { email, name, phone, username, website } } }) =>
    m(
      '.grid-item.user',
      {
        id: `user-${key}`,
        key,
      },
      [
        m('.row', [ m('p.left', { for: 'name' }, 'name'), m('p.right.bold', { name: 'name' }, name) ]),
        m('.row', [ m('p.left', { for: 'email' }, 'email'), m('p.right.bold', { name: 'email' }, email) ]),
        m('.row', [ m('p.left', { for: 'phone' }, 'phone'), m('p.right.bold', { name: 'phone' }, phone) ]),
        m('.row', [
          m('p.left', { for: 'username' }, 'username'),
          m('p.right.bold', { name: 'username' }, username),
        ]),
        m('.row', [ m('p.left', { for: 'website' }, 'website'), m('p.right.bold', { name: 'website' }, website) ]),
      ]
    ),
}

const makeItem = type => {
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



const Component = {
  view: ({ attrs: { model } }) => {
    let route = model.state.route
    let Item = makeItem(route)
    let data = model.data[route].data

    return m(
      'section.component',
      {
        id: 'component',
        route: model.state.route,
        onscroll: infiniteScroll(model),
      },
      isEmpty(data)
        ? m('.loader', IsLoading)
        : data.map((_item, idx) =>
          m(Item, {
            oncreate: animateComponentEntrance(idx),
            key: idx,
            item: _item,
            model,
          })
        )
    )
  },
}


const toRoute = model => ({
  onmatch: (_, path) =>
    init(model)(path),
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
})

export const App = model => {
  return {
    '/posts': toRoute(model),
    '/comments': toRoute(model),
    '/albums': toRoute(model),
    '/photos': toRoute(model),
    '/todos': toRoute(model),
    '/users': toRoute(model),
  }
}
