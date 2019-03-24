import m from 'mithril'
import Layout from './components/Layout.js'
import { makeRoutes, isEmpty, init, infiniteScroll, animateComponentEntrance, slideOutAnimation } from './utils/index'

const IsLoading = m('.holder',  [
  m('.preloader', [ m('div'), m('div'), m('div'), m('div'), m('div'), m('div'), m('div') ]),
])

const plus = 'M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z'
const minus = 'M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-12v-2h12v2z'

const toUnFurl = (bool = false) => bool ?  m('path', { style:{fill:'#ff6600'}, d: minus }) :  m('path', { style:{fill:'#ff6600'}, d: plus })



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
            m('a.top.highlight', ` by ${user}`),
            m('code.bottom', `${time_ago}`),
          ]),
          m('.right', [
            m('code.highlight.top', `${points} points`),
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
          m('a.highlight', `${user} `),
          m('code', ` ${time_ago}`),
        ]),
        m('.nudgeRight',[
          m('code', m.trust(content)),
          comments_count
            ? m('button.commentBtn', { onclick: () => model.toggleComments({ model, key, level }) },
              [m('svg', { style: { width: '30px', height: '30px' } }, toUnFurl(state.showComments)), `${comments_count} comments`])
            : '',
          (state.showComments ? comments.map((c, idx) => m(Comment, {
            oncreate: animateComponentEntrance(idx),
            // onbeforeremove: slideOutAnimation,
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
            m('h1.title', data.title),
            data.comments.map((c, idx) =>
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
