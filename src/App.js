import m from 'mithril'
import Layout from './Layout.js'
import { isEmpty, getData } from './helpers.js'
import { animateChildrenFadeIn } from './animations.js'

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

const Posts = ({ attrs: { model, item: { title, body } } }) => {
  return {
    view: () => {
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

const Comments = ({ attrs: { model, item: { email, name, body } } }) => {
  return {
    view: () => {
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

const Albums = ({ attrs: { model, item: { title } } }) => {
  return {
    view: () => {
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

const Photos = ({ attrs: { model, item: { thumbnailUrl, title, url } } }) => {
  let state = {
    isSmall: true,
    small: thumbnailUrl,
    large: url,
  }

  return {
    view: () => {
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
            onclick: () => (state.isSmall = !state.isSmall),
            style: { left: 'auto', flex: '1 150px' },
            src: state.isSmall ? state.small : state.large,
          }),
        ]
      )
    },
  }
}

const Todos = ({ attrs: { item: { completed } } }) => {
  const state = {
    completed: completed,
  }
  const checked = () => {
    state.completed = !state.completed
  }

  return {
    view: ({ attrs: { key, model, item: { title } } }) => {
      let itemStyles = itemStyle(model.themes(model.mode).item)
      return m(
        '.grid-item',
        {
          id: 'todos',
          style: itemStyles,
        },
        [
          m(
            'input[type=checkbox].fancyCheckBox',
            {
              key,
              onclick: checked,
              checked: state.completed,
            },
            'Done'
          ),
          m('h1', title),
        ]
      )
    },
  }
}

const Users = ({ attrs: { model, item: { address, company, email, name, phone, username, website } } }) => {
  const state = { isOpen: false }
  return {
    view: () => {
      let itemStyles = itemStyle(model.themes(model.mode).item)
      return m(
        '.grid-item',
        {
          onclick: () => (state.isOpen = !state.isOpen),
          id: 'users',
          style: {
            ...itemStyles,
            overflow: state.isOpen ? 'auto' : 'hidden',
            height: state.isOpen ? 'auto' : '150px',
          },
        },
        [
          m('h1', name),
          m('p', email),
          m('pre', JSON.stringify(address, null, 2)),
          m('pre', JSON.stringify(company, null, 2)),
          m('p', phone),
          m('p', username),
          m('p', website),
        ]
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
  const infiniteScroll = model => e => {
    let route = model.state.route
    let length = model.data[route].data.length
    let setpoint = 10 * length * model.state.scrollPos
    if (e.target.scrollTop - model.state.scrollPos >= setpoint) {
      model.state.scrollPos++ + e.target.scrollTop
      if (length < model.data[route].limit) {
        getData(model)(route)
      }
    }
  }

  return {
    view: ({ attrs: { model } }) => {
      console.log('component view ', model)
      let route = model.state.route
      let Component = toComponent(route)
      let data = model.data[route].data
      let componentStyles = componentStyle(model.themes(model.mode).component)
      return m(
        'section.component',
        {
          oncreate: animateChildrenFadeIn,
          onupdate: animateChildrenFadeIn,
          onscroll: infiniteScroll(model),
          id: 'component',
          style: componentStyles,
        },
        isEmpty(data)
          ? m('', { style: { width: '80vw' } }, IsLoading)
          : data.map((item, idx) =>
            m(Component, {
              key: idx,
              item: item,
              model,
            })
          )
      )
    },
  }
}

const init = model => path => {
  model.state.scrollPos = 1
  model.showTabs = false
  return getData(model)(path)
}

export const App = model => {
  return {
    '/posts': {
      onmatch: (_, path) => init(model)(path),
      render: () => {
        console.log('app', model)
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
