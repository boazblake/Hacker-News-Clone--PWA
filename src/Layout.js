import m from 'mithril'

const adjust = m(
  'svg',
  { style: { width: '10px', height: '10px' }, xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 20 20' },
  [ m('path', { d: 'M10 2v16a8 8 0 1 0 0-16zm0 18a10 10 0 1 1 0-20 10 10 0 0 1 0 20z' }) ]
)

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
            display: 'flex',
            textDecoration: 'none',
            flexBasis: '20%',
            borderTop: active ? activeBorder : '',
            borderBottom: !active && state.onhover ? inactiveBorder : '',
            justifyContent: 'center',
            alignContent: 'center',
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
        'header.heading.grid-item',
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
    view: () => m('footer.footer.grid-item', { id: 'footer' }, 'Footer'),
  }
}

const Color = () => {
  return {
    view: ({ attrs: { model, color: { color: { r, g, b } } } }) =>
      m('.color', {
        id: 'color',
        onclick: () => (model.mode = { r, g, b }),
        style: { width: '40px', height: '40px', flexBasis: '20%', backgroundColor: `rgb(${r},${g},${b})` },
      }),
  }
}

const Colors = ({ attrs: { model: { sidebar } } }) => {
  const getCol = () => (sidebar.isOpen ? 'column' : '')
  return {
    onupdate: () => getCol(),
    view: ({ attrs: { model } }) => {
      return m(
        '.colors',
        {
          style: {
            display: 'flex',
            alignContent: 'flex-start',
            flexFlow: `${getCol()} wrap`,
            width: '100%',
            // height: '100px',
          },
        },
        model.pallette.map(color => m(Color, { model, color }))
      )
    },
  }
}

const openCloseSideBar = model =>
  m(
    'button',
    {
      style: { width: '100%', height: '40px' },
      onclick: () => {
        model.sidebar.isOpen = !model.sidebar.isOpen
      },
    },
    model.sidebar.isOpen ? '<<' : '>>'
  )

const showModes = model =>
  m(
    'button',
    {
      style: { margin: ', auto', width: '100%', height: '40px' },
      onclick: () => model.changeMode(),
    },
    model.sidebar.isOpen ? 'Mode' : adjust
  )

const Sidebar = ({ attrs: { model } }) => {
  return {
    view: () =>
      m(
        'aside.sidebar.grid-item slide-left',
        {
          id: 'sidebar',
          style: {
            backgroundColor: model.themes(model.mode).sidebar,
          },
        },
        [ openCloseSideBar(model), showModes(model), model.showModes ? m(Colors, { model }) : '' ]
      ),
  }
}

const Body = () => {
  return {
    view: ({ attrs: { children } }) => m('section.content.grid-item', { id: 'content' }, children),
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
