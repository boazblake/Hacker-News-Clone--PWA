import m from 'mithril'

const Tab = ({ attrs: { key } }) => {
  const state = { onhover: false }
  const hover = e => {
    state.onhover = !state.onhover
    console.log('on hover tab', state)
    return false
  }

  return {
    view: ({ attrs: { active, tab, activeBorder, inactiveBorder } }) =>
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
            borderTop: active ? activeBorder : '',
            borderBottom: !active && state.onhover ? inactiveBorder : '',
          },
        },
        tab.split('/')[1]
      ),
  }
}

const Heading = ({ attrs: { model } }) => {
  const showTabs = () => {
    model.showTabs = !model.showTabs
    console.log('heading show tabs', model)
  }

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
              activeBorder: model.themes(model.mode).tab.activeBorder,
              inactiveBorder: model.themes(model.mode).tab.inactiveBorder,
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

const Color = () => {
  return {
    view: ({ attrs: { model, color: { color: { r, g, b } } } }) =>
      m('.color', {
        onclick: () => (model.mode = { r, g, b }),
        style: { backgroundColor: `rgb(${r},${g},${b})` },
      }),
  }
}

const darken = ({ r, g, b }) => `rgba(${r / 2},${g / 2},${b / 2},1)`

const Colors = () => {
  return {
    view: ({ attrs: { model } }) => {
      return m(
        '.colorContainer',
        { style: { backgroundColor: darken(model.mode) } },
        model.pallette.map((color, idx) => m(Color, { key: idx, model, color }))
      )
    },
  }
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

const Sidebar = ({ attrs: { model } }) => {
  return {
    view: () =>
      m(
        'aside.sidebar slide-left',
        {
          id: 'sidebar',
          style: {
            backgroundColor: model.themes(model.mode).sidebar,
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

const Body = ({ attrs: { children } }) => {
  console.log('Body', children)
  return {
    onupdate: vnode => vnode,
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
          ? [ m(Heading, { model }), m(Sidebar, { model }), m(Body, { model, children }), m(Footer, { model }) ]
          : []
      ),
  }
}

export default Layout
