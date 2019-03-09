import m from 'mithril'
import { animateSidebarEntrance } from '../animations.js'

const Tab = ({ attrs: { key } }) => {
  const state = { onhover: false }
  const hover = () => {
    state.onhover = !state.onhover
  }

  return {
    view: ({ attrs: { tab } }) =>
      m(
        'a.tab',
        {
          key,
          id: `${tab}`,
          href: `${tab}`,
          oncreate: m.route.link,
          onmouseover: hover,
          onmouseout: hover,
        },
        tab.split('/')[1]
      ),
  }
}

const Sidebar = ({ attrs: { model } }) => {
  let tabs = Object.keys(model.reqs.urls)

  return {
    oncreate: animateSidebarEntrance,
    view: ({ attrs: { model } }) =>
      m(
        'aside.sidebar slide-left',
        {
          id: 'sidebar',
        },
        tabs.map((tab, idx) =>
          m(Tab, {
            key: idx,
            active: model.state.route == tab,
            tab,
          })
        )
      ),
  }
}

export default Sidebar
