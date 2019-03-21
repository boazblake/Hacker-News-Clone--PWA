import m from 'mithril'
import Layout from './components/Layout.js'
import {makeRoutes, isEmpty, init, infiniteScroll, animateComponentEntrance } from './utils/index.js'

const IsLoading = m('.holder',  [
  m('.preloader', [ m('div'), m('div'), m('div'), m('div'), m('div'), m('div'), m('div') ]),
])

const Item = {
  view: ({ attrs: { key, item: { comments_count,
    domain,
    id,
    points,
    time,
    time_ago,
    title,
    type,
    url,
    user } } }) => {

    return m(
      '.grid-item.row.post',
      {
        href:url,
        id: `post-${key-id}`,
      },
      [m('h1.left', title), m('a.right',user), m('p.right', points), m('p.right', time_ago), m('p.right', domain), m('p.right', time), m('p.right', type), m('p.right', comments_count) ]
    )
  },
}


const Component = {
  view: ({ attrs: { model } }) => {
    let route = model.state.route
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

export const App = model =>
  model.routes.reduce(makeRoutes(model)(toRoute),{})
