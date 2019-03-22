import m from 'mithril'
import Layout from './components/Layout.js'
import {makeRoutes, isEmpty, init, infiniteScroll, animateComponentEntrance } from './utils/index.js'

const IsLoading = m('.holder',  [
  m('.preloader', [ m('div'), m('div'), m('div'), m('div'), m('div'), m('div'), m('div') ]),
])

const Item = {
  view: ({ attrs: { model,item: { comments_count,
    domain,
    id,
    points,
    time_ago,
    title,
    url,
    user } } }) => {
    return m(
      '.grid-item',
      {
        href:url,
        id: `${id}`,
      },
      [
        m('.postTop', [
          m('h1', title), m('code.subTitle', ` from ${domain}`)]),
        m('.postBottom', [
          m('.',[
            m('code.points',`${points}`), m('a', ` points by ${user}`),

          ]),
          m('.row', [
            m('code.left', `${time_ago} |`),
            m('a.right', { oncreate: m.route.link, href: `/item/${id}`, onclick:() => model.state.id = id},`${comments_count} comments`),
          ]),
        ]),
      ]
    )
  },
}


const Component = {
  view: ({ attrs: { model } }) => {
    let route = model.state.route
    let data = model.data[route].data
    let showItem = (id, title = '') => {
      console.log(id)
      model.state.title = title
      model.state.id = id
      model.state.showComments = !model.state.showComments
    }

    return m(
      'section.component',
      {
        id: 'component',
        route: model.state.route,
        onscroll: infiniteScroll(model),
      },
      isEmpty(data)
        ? m('.loader', IsLoading)
        : data.map ? data.map((_item, idx) =>
          m(Item, {
            oncreate: animateComponentEntrance(idx),
            key: idx,
            item: _item,
            model, showItem,
          })
        ) : data.comments.map((_item, idx) =>
          m(Item, {
            oncreate: animateComponentEntrance(idx),
            key: idx,
            item: _item,
            model, showItem,
          })
        )
    )
  },
}


const toRoute = model => ({
  onmatch: (_, path) => {
    init(model)(path)
  },
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
