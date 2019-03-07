import m from 'mithril'

const Hamburger = ({ attrs: { model } }) => {
  const state = {
    close:
      'M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z',
    open: 'M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z',
  }

  return {
    oncreate: ({ dom, attrs: { model } }) => {
      let _dom = dom
      return m.render(
        _dom,
        m('path', {
          xmlns: 'http://www.w3.org/2000/svg',
          d: model.tabsShowing ? state.close : state.open,
        })
      )
    },
    onupdate: ({ dom, attrs: { model } }) => {
      let _dom = dom
      return m.render(
        _dom,
        m('path', {
          xmlns: 'http://www.w3.org/2000/svg',
          d: model.tabsShowing ? state.close : state.open,
        })
      )
    },
    view: () =>
      m('svg.hamburger', {
        onclick: () => {
          model.showTabs(model)
        },
      }),
  }
}

export default Hamburger
