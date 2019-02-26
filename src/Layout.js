import m from 'mithril'

const Tab = () => {
  const state = { onhover: false }
  const hover = e => {
    e.stopPropagation()
    state.onhover = !state.onhover
  }

  return {
    view: ({ attrs: { active, tab, idx, activeBorder, inactiveBorder } }) =>
      m(
        'a.tab',
        {
          id: idx,
          href: `${tab}`,
          oncreate: m.route.link,
          onmouseover: hover,
          onmouseout: hover,
          style: {
            paddingTop: '30px',
            display: 'flex',
            textDecoration: 'none',
            flexBasis: '20%',
            borderTop: active ? activeBorder : '',
            borderBottom: !active && state.onhover ? inactiveBorder : '',
            justifyContent: 'flex-start',
            alignContent: 'flex-end',
          },
        },
        tab.split('/')[1]
      ),
  }
}

const Heading = ({ attrs: { model } }) => {
  let tabs = Object.keys(model.reqs.urls)
  return {
    view: ({ attrs: { model } }) =>
      m(
        'header.heading',
        {
          id: 'header',
        },
        tabs.map((tab, idx) =>
          m(Tab, {
            key: idx,
            active: model.state.route == tab,
            tab,
            idx,
            activeBorder: model.themes(model.mode).tab.activeBorder,
            inactiveBorder: model.themes(model.mode).tab.inactiveBorder,
          })
        )
      ),
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
    'button.sidebarBtn',
    {
      onclick: () => (model.showModes = !model.showModes),
    },
    'Change Theme'
  )

const changeLimit = model =>
  m(
    'button.sidebarBtn',
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
          ? [ m(Heading, { model }), m(Sidebar, { model }), m(Body, { model, children }), m(Footer, { model }) ]
          : []
      ),
  }
}

export default Layout
