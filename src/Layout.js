import m from 'mithril'
import { animateChildrenEntrance } from './animations.js'
import Header from './components/Header.js'
import Footer from './components/Footer.js'
import Body from './components/Body.js'
import Sidebar from './components/Sidebar.js'
import Modal from './components/Modal.js'

const Layout = ({ attrs: { model } }) => {
  return {
    oncreate: animateChildrenEntrance,
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
              ? model.tabsShowing ? m(Modal, m(Sidebar, { model })) : ''
              : m(Sidebar, { model }),
            m(Body, { model, children }),
            m(Footer, { model }),
          ]
          : []
      ),
  }
}

export default Layout
