import m from 'mithril'

const Tab = () => {
  const state = { onhover: false }
  const hover = e => {
    e.stopPropagation()
    state.onhover = !state.onhover
  }

  return {
    view: ({ attrs: { active, tab, idx } }) =>
      m(
        'a.grid-item',
        {
          id: idx,
          href: `${tab}`,
          oncreate: m.route.link,
          onmouseover: hover,
          onmouseout: hover,
          style: {
            // backgroundColor: state.onhover ? 'rgba(41,128,185 ,.3)' : '',
            textDecoration: 'none',
            // display: 'flex',
            flexBasis: '20%',
            borderTop: active
              ? '4px solid rgba(41,128,185 ,1)'
              : !active && state.onhover ? '4px solid rgba(41,128,185 ,.5)' : '',
            // height: '40px',
            // minWidth: '80px',
            justifyContent: 'center',
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
        'header',
        {
          style: {
            gridColumn: 'span ',
            display: 'flex',
            flexFlow: 'row',
            alignContent: 'center',
            justifyContent: 'center',
            height: '10vh',
            // padding: '35px 20%',
          },
        },
        tabs.map((tab, idx) => m(Tab, { key: idx, active: model.state.route == tab, tab, idx }))
      ),
  }
}

const Footer = () => {
  return {
    view: () => m('footer', { style: { height: '20vh' } }, 'Footer'),
  }
}

const Sidebar = ({ attrs: { model } }) => {
  return {
    view: () =>
      m(
        'aside.slide-left',
        {
          style: {
            backgroundColor: 'rgba(41,128,185 ,0.9)',
            flexGrow: 1,
            width: model.sidebar.isOpen ? '200px' : '60px',
            height: '75vh',
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
    view: ({ attrs: { model, children } }) =>
      m('section.body', { style: { display: 'flex' } }, [
        m(Sidebar, { model }),
        m('.container', { id: 'container', style: { width: '100%', height: '80vh' } }, children),
      ]),
  }
}

const Layout = ({ attrs: { model } }) => {
  return {
    view: ({ children }) =>
      m(
        'section.main',
        {
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gridTemplateRows: '50px 350px 50px',
        },
        [ m(Heading, { model }), m(Body, { model, children }), m(Footer, { model }) ]
      ),
  }
}

export default Layout
