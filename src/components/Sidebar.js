import m from 'mithril'
import { animateSidebarEntrance } from '../utils/animations.js'
import { without } from 'ramda'

const Tab = ({ attrs: { key } }) => {
  return {
    oncreate: animateSidebarEntrance,
    view: ({ attrs: { tab } }) =>
      m(
        'a.tab',
        {
          key,
          id: `${tab}`,
          href: `/${tab}`,
          oncreate: m.route.link,
        },
        tab
      ),
  }
}

const Sidebar = ({ attrs: { model } }) => {
  let tabs = Object.keys(model.reqs.urls)
  let navTabs = without(['item', 'user'], tabs)

  return {
    oncreate: animateSidebarEntrance,
    view: ({ attrs: { model } }) =>
      m(
        'aside.sidebar slide-left',
        {
          id: 'sidebar',
        },
        navTabs.map((tab, idx) =>
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
