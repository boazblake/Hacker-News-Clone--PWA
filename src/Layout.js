import m from 'mithril'

const Tab = ({ attrs: { active, tab, idx } }) => {
  const state = { onhover: false }
  console.log(state)

  const hover = (e) => {
    state.onhover = !state.onhover
    // e.target.style.backgroundColor = state.onhover ? 'blue' : ''
  }

  return {
    view: ({ attrs: { active, tab, idx } }) =>
      m(
        'a',
        {
          id: idx,
          href: `${tab}`,
          // oncreate: m.route.link,
          onmouseover: hover,
          // onmouseout: hover,
          style: {
            backgroundColor: state.onhover ? 'blue' : 'green',
            textDecoration: 'none',
            // display: 'flex',
            borderTop: active ? '4px solid rgba(41,128,185 ,1)' : '',
            // height: '40px',
            width: '80px',
            padding: '0 12px 0 12px',
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
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            height: '10vh',
            paddingTop: '35px',
          },
        },
        tabs.map((tab, idx) => m(Tab, { key: idx, active: model.state.route == tab, tab, idx }))
      ),
  }
}

const Footer = () => {
  return {
    view: () => m('footer', { style: { height: '20vh' } }, 'FOOTER'),
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

const Body = ({ attrs: { model, children } }) => {
  return {
    view: ({ attrs: { model, children } }) =>
      m('section.body', { style: { display: 'flex' } }, [
        m(Sidebar, { model }),
        m('.container', { style: { width: '100%', height: '80vh' } }, children),
      ]),
  }
}

const Layout = (model) => ({
  view: ({ children }) => [ m(Heading, { model }), m(Body, { model, children }), m(Footer) ],
})

export default Layout
