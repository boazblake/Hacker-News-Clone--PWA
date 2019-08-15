import m from 'mithril'
import Header from './Header.js'
import Footer from './Footer.js'
import Body from './Body.js'

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
            m(Body, { model, children }),
            m(Footer, { model }),
          ]
          : []
      ),
  }
}

export default Layout
