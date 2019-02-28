import m from 'mithril'

import { darken } from './helpers.js'

const Tab = ({ attrs: { key } }) => {
  const state = { onhover: false }
  const hover = () => {
    state.onhover = !state.onhover
  }

  return {
    view: ({ attrs: { active, tab, color: { r, g, b } } }) =>
      m(
        'a.tab',
        {
          key,
          id: `${tab}`,
          href: `${tab}`,
          oncreate: m.route.link,
          onmouseover: hover,
          onmouseout: hover,
          style: {
            borderTop: active ? `4px solid rgba(${r},${g},${b} ,1)` : '',
            borderBottom: !active && state.onhover ? `4px solid rgba(${r},${g},${b} ,.5)` : '',
            color: active ? `rgba(${r},${g},${b} ,1)` : `rgba(${r},${g},${b} ,.5)`,
          },
        },
        tab.split('/')[1]
      ),
  }
}

const Heading = ({ attrs: { model } }) => {
  const showTabs = () => (model.showTabs = !model.showTabs)

  let tabs = Object.keys(model.reqs.urls)
  return {
    view: ({ attrs: { model } }) => {
      return m(
        'header.heading',
        {
          id: 'header',
        },
        model.state.profile != 'phone' || model.showTabs
          ? tabs.map((tab, idx) =>
            m(Tab, {
              key: idx,
              active: model.state.route == tab,
              tab,
              color: model.mode,
            })
          )
          : m(
            'button.Btn',
            {
              onclick: showTabs,
            },
            'show tabs'
          )
      )
    },
  }
}

const Footer = () => {
  return {
    view: () => m('footer.footer', { id: 'footer' }, 'Footer'),
  }
}

const Color = {
  view: ({ attrs: { model, color: { color: { r, g, b } } } }) =>
    m('.color', {
      onclick: () => (model.mode = { r, g, b }),
      style: { backgroundColor: `rgb(${r},${g},${b})` },
    }),
}

const Colors = {
  view: ({ attrs: { model } }) => {
    return m(
      '.colorContainer',
      { style: { backgroundColor: darken(model.mode) } },
      model.pallette.map((color, idx) => m(Color, { key: idx, model, color }))
    )
  },
}

const changeTheme = model =>
  m(
    'button.Btn',
    {
      onclick: () => (model.showModes = !model.showModes),
    },
    'Change Theme'
  )

const changeLimit = model =>
  m(
    'button.Btn',
    {
      onclick: () => (model.showLimits = !model.showLimits),
    },
    'Change Limit'
  )

const limitSelector = model =>
  m(
    'select',
    { id: 'url-limit', onchange: ({ target }) => (model.state.limit = target.value) },
    model.limits.map((limit, idx) => m('option', { value: limit, key: idx }, limit))
  )

const Sidebar = ({ attrs: { model, color: { r, g, b } } }) => {
  return {
    view: () =>
      m(
        'aside.sidebar slide-left',
        {
          id: 'sidebar',
          style: {
            backgroundColor: `rgba(${r},${g},${b} ,.9)`,
          },
        },
        [
          changeTheme(model),
          model.showModes ? m(Colors, { model }) : '',
          changeLimit(model),
          model.showLimits ? limitSelector(model) : '',
        ]
      ),
  }
}

const Body = () => {
  return {
    view: ({ attrs: { children } }) => m('section.content', { id: 'content' }, children),
  }
}

const Layout = ({ attrs: { model } }) => {
  return {
    view: ({ children }) =>
      m(
        'section.layout',
        {
          id: 'layout',
        },
        children
          ? [
            m(Heading, { model }),
            m(Sidebar, { model, color: model.mode }),
            m(Body, { model, children }),
            m(Footer, { model }),
          ]
          : []
      ),
  }
}

export default Layout
