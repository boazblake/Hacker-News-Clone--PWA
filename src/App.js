import m from 'mithril'
import Layout from './components/Layout.js'
import {makeRoutes, isEmpty, init, infiniteScroll, animateComponentEntrance } from './utils/index.js'

const IsLoading = m('.holder',  [
  m('.preloader', [ m('div'), m('div'), m('div'), m('div'), m('div'), m('div'), m('div') ]),
])

const Item = {
  view: ({ attrs: { showItem, item: { comments_count,
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
          m('h1.title', title), m('code.subTitle', ` from ${domain}`)]),
        m('.postBottom', [
          m('.',[
            m('code.points',`${points}`), m('a', ` points by ${user}`),
          ]),
          m('.row', [
            m('code.left', `${time_ago}`),
            m('a.right', { oncreate: m.route.link, href: `/item/${id}`, onclick: () => showItem(id, title)},`${comments_count} comments`),
          ]),
        ]),
      ]
    )
  },
}

const Comment = {
  view: ({ attrs: { model, item: { comments, comments_count,
    id,
    time_ago,
    content,
    url,
    user } } }) => {
    return m(
      '.commentContainer',
      {
        href: url,
        id: `${id}`,
      },
      [
        m('.commentTop' ),
        m('.commentBottom', [
          m('.', [
            m('code', m.trust(content)), m('a', `  by ${user}`),
          ]),
          m('.', {style:{display:'flex', flexFlow:'column'}},[
            m('code.left', `${time_ago}`),
            m('code.right', `${comments_count} comments`),
            comments.map((_item, idx) => m(Comment, {
              key: idx,
              item: _item,
              model,
            })),

          ]),
        ]),
      ]
    )
  },
}


const Component = () => {
  const isItem = data => data.map
  const isComment= data => data.comments.map

  return {
    view: ({ attrs: { model } }) => {
      let route = model.state.route
      let data = model.data[route].data
      let showItem = (id, title = '') => {
        model.state.title = title
        model.state.id = id
        model.state.showComment = !model.state.showComment
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
          : isItem(data) ? data.map((_item, idx) =>
            m(Item, {
              oncreate: animateComponentEntrance(idx),
              key: idx,
              item: _item,
              model, showItem,
            })
          ) : isComment(data) ? [
            m('.postTop', m('h1.title', data.title)),
            m(Comment, {
              item: data,
              model,
            }), data.comments.map((_item, idx) =>
              m(Comment, {
                oncreate: animateComponentEntrance(idx),
                key: idx,
                item: _item,
                model,
              })
            )] : '' // add User component here...
      )
    },
  }}


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
