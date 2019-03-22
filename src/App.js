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

const Comment = ({attrs:{model}}) => {
  console.log('???',model)
  return {
    view: ({ attrs: { model, item: { comments_count,
      id,
      time_ago,
      content,
      url,
      user } } }) => {

      return m(
        '.grid-item',
        {
          href: url,
          id: `${id}`,
        },
        [
          m('.postTop', m('h1.title', model.state.title)),
          m('.postBottom', [
            m('.', [
              m('code', m.trust(content)), m('a', `  by ${user}`),
            ]),
            m('.row', [
              m('code.left', `${time_ago}`),
              m('a.right', { oncreate: m.route.link, href: `/item/${id}`, onclick: () => model.state.id = id }, `${comments_count} comments`),
            ]),
          ]),
        ]
      )
    },
  }}


const Component = () => {
  const isItem = data => data.map
  const isComment= data => data.comments.map

  return {
    view: ({ attrs: { model } }) => {
      let route = model.state.route
      let data = model.data[route].data
      let showItem = (id, title = '') => {
        console.log(id)
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
          ) : isComment(data) ? [m(Comment, {
            style: { backgroundColor:'rgba(225, 102, 0, .9)'},
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
