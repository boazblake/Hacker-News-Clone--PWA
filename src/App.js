import m from 'mithril'
import Layout from './components/Layout.js'
import {makeRoutes, isEmpty, init, infiniteScroll, animateComponentEntrance } from './utils/index.js'

const IsLoading = m('.holder',  [
  m('.preloader', [ m('div'), m('div'), m('div'), m('div'), m('div'), m('div'), m('div') ]),
])

const Post = {
  view: ({ attrs: { showItem, post: { comments_count,
    domain,
    id,
    points,
    time_ago,
    title,
    url,
    user } } }) => {
    return m(
      '.postContainer',
      {
        id: `${id}`,
      },
      [
        m('.top', [
          m('h1.title', title), m('code.subTitle', ' from ', m('a.', { oncreate: m.route.link, href: url }, `${domain}`)),
        ]),
        m('.bottom', [
          m('.left', [
            m('a.top', ` by ${user}`),
            m('code.bottom', `${time_ago}`),
          ]),
          m('.right', [
            m('code.points.top', `${points} points`),
            m('a.bottom', {
              oncreate: m.route.link,
              href: `/item/${id}`,
              onclick: () => showItem(id, title),
            },
            `${comments_count} comments`),
          ]),
        ]),
      ])
  },
}

const Comment = {
  view: ({ attrs: { model, comment: { comments, comments_count,
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
            comments.map((c, idx) => m(Comment, {
              key: idx,
              comment: c,
              model,
            })),

          ]),
        ]),
      ]
    )
  },
}


const Component = () => {
  const isPost = data => data.map
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
          : isPost(data) ? data.map((_post, idx) =>
            m(Post, {
              oncreate: animateComponentEntrance(idx),
              key: idx,
              post: _post,
              model, showItem,
            })
          ) : isComment(data) ? [
            m('.postTop', m('h1.title', data.title)),
            m(Comment, {
              comment: data,
              model,
            }), data.comments.map((c, idx) =>
              m(Comment, {
                oncreate: animateComponentEntrance(idx),
                key: idx,
                comment: c,
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
