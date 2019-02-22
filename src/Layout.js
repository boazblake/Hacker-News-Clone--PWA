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
        'a.Tab',
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
        'header.Heading',
        {
          style: {
            gridArea: 'header ',
            display: 'flex',
            flexFlow: 'row',
            alignContent: 'center',
            justifyContent: 'center',
          },
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
    view: () => m('footer.Footer', { style: { gridArea: 'footer' } }, 'Footer'),
  }
}

const Sidebar = ({ attrs: { model } }) => {
  return {
    view: () =>
      m(
        'aside.Sidebar slide-left',
        {
          style: {
            backgroundColor: model.themes(model.mode).sidebar,
            gridArea: 'sidebar',
            width: model.sidebar.isOpen ? '200px' : '60px',
          },
        },
        [
          m(
            'button',
            {
              style: { width: '100%', height: '40px' },
              onclick: () => {
                model.sidebar.isOpen = !model.sidebar.isOpen
              },
            },
            model.sidebar.isOpen ? '<<' : '>>'
          ),
          m(
            'button',
            {
              style: { width: '100%', height: '40px' },
              onclick: () => {
                model.numItems++
              },
            },
            model.sidebar.isOpen ? 'ADD' : '+'
          ),
          m(
            'button',
            {
              style: { width: '100%', height: '40px' },
              onclick: () => {
                model.numItems--
              },
            },
            model.sidebar.isOpen ? 'REMOVE' : '-'
          ),
        ]
      ),
  }
}

const Body = () => {
  return {
    view: ({ attrs: { children } }) => m('section.Body', { style: { gridArea: 'content', display: 'flex' } }, children),
  }
}

const Layout = ({ attrs: { model } }) => {
  return {
    view: ({ children }) =>
      m(
        'section.Layout',
        {
          style: {
            height: '100vh',
            padding: '40px',
            display: 'grid',
            gridTemplateColumns: '1fr ',
            gridTemplateRows: '5% 90%',
            gridGap: '10px',
            gridTemplateAreas: '"....... header header""sidebar content content"  "footer  footer  footer"',
          },
        },
        children
          ? [ m(Heading, { model }), m(Sidebar, { model }), m(Body, { model, children }), m(Footer, { model }) ]
          : []
      ),
  }
}

export default Layout
