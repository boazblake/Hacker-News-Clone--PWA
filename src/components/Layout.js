import m from 'mithril'
import Header from './Header.js'
import Footer from './Footer.js'
import Sidebar from './Sidebar.js'
import Modal from './Modal.js'

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
            m(Header, { model }),
            model.state.profile == 'phone'
              ? model.state.tabsShowing ? m(Modal, m(Sidebar, { model })) : null
              : m(Sidebar, { model }),
            m('section.content', { id: 'content' }, children),
            m(Footer, { model }),
          ]
          : []
      ),
  }
}

export default Layout
