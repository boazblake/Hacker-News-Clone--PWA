import m from 'mithril'
import Layout from './components/Layout.js'
import Modal from './components/Modal.js'
import { makeRoutes, isEmpty, init, infiniteScroll } from './utils/index'

const IsLoading = m('.holder',  [
  m('.preloader', [ m('div'), m('div'), m('div'), m('div'), m('div'), m('div'), m('div') ]),
])

const plus = 'M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z'
const minus = 'M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-12v-2h12v2z'

const toUnFurl = (bool = false) => bool ?  m('path.highlight', { d: minus }) :  m('path.highlight', { d: plus })

const userModalInfo = model => ({
  init: model => model.getDataById(model)('user')(model.state.user.id),
  close: model => model.toggleUser(model)(''),
  title: 'User',
  contents: model.data.user && model.data.user.data
    ? [
      m('code', `id: ${model.data.user.data.id}`),
      m('code', `created: ${model.data.user.data.created}`),
      m('code' , `about: ${(model.data.user.data.about)}`),
      m('code', `karma: ${model.data.user.data.karma}`),
    ]
    : [],
  footer: [],
})



const toComment = comments_count => showItem => (id, title) =>
  comments_count ?
    m('a.bottom', {
      oncreate: m.route.link,
      target: '_blank',
      rel:'noopener',
      href: `/item/${id}`,
      onclick: () => showItem(id, title),
    },
    `${comments_count} comments`) : `${comments_count} comments`

const Post = {
  view: ({ attrs: { model, showItem, post: { comments_count,
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
          m('h1.title', title), m('code.subTitle', ' from ', m('a.', { target: '_blank', href: url, rel: 'noopener' }, `${domain}`)),
        ]),
        m('.bottom', [
          m('.left', [
            m('.top.highlight',{onclick: () => {
              model.toggleUser(model)(user)
            }},` by ${user}`),
            m('code.bottom', `${time_ago}`),
          ]),
          m('.right', [
            m('code.highlight.top', `${points} points`),
            toComment(comments_count)(showItem)(id, title),
          ]),
        ]),
      ])
  },
}

const Comment = {
  view: ({ attrs:{ key, model, comment: { comments, comments_count,
    id,
    time_ago,
    content,
    level,
    user } } }) => {

    let state = {showComments : model.state.comment[`${key}-${level}`] || false }

    return m(
      '.commentContainer',
      {
        id: `${id}`,
      },
      [
        m('.',[
          m('a.highlight', {
            onclick: () => {
              model.toggleUser(model)(user)
              console.log(user)
            },
          }, ` ${user}`),
          m('code', ` ${time_ago}`),
        ]),
        m('.nudgeRight',[
          m('code', m.trust(content)),
          comments_count
            ? m('button.commentBtn', { onclick: () => model.toggleComments({ model, key, level }) },
              [m('svg.toggleCommentSvg', toUnFurl(state.showComments)), `${comments_count} comments`])
            : '',
          (state.showComments ? comments.map((c, idx) => m(Comment, {
            key: idx,
            comment: c,
            model,
          })): ''),
        ]),
      ]
    )
  },
}


const Component = () => {
  const isPost = data => data.map
  const isComment = data => data.comments && data.comments.map

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
        [isEmpty(data)
          ? m('.loader', IsLoading)
          : isPost(data) ? data.map((_post, idx) =>
            m(Post, {
              key: idx,
              post: _post,
              model, showItem,
            })
          ) : isComment(data) ? [
            m('h1.title', data.title),
            data.comments.map((c, idx) =>
              m(Comment, {
                key: idx,
                comment: c,
                model,
              })
            )] : '' ,
        model.state.showUser && model.state.user.id ? m(Modal, { ...userModalInfo(model), model }) : '',
        ]
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
