import m from 'mithril'
import Hamburger from './Hamburger.js'

const changeLimit = model =>
  m(
    'button.btn',
    {
      onclick: () => (model.showLimits = !model.showLimits),
    },
    'Change Limit'
  )

const limitSelector = model =>
  m(
    'select',
    { id: 'url-limit', onchange: ({ target }) => (model.state.limit = target.value) },
    model.limits.map((limit, idx) => m('option', { value: limit, key: idx }, limit))
  )

const Header = () => {
  return {
    view: ({ attrs: { model } }) =>
      m(
        'header.header',
        {
          id: 'header',
        },
        [ 'desktop', 'tablet' ].includes(model.state.profile) || model.tabsShowing
          ? [
            model.state.profile == 'phone' ? m(Hamburger, { model }) : '',
            changeLimit(model),
            model.showLimits ? limitSelector(model) : '',
          ]
          : [ m(Hamburger, { model }) ]
      ),
  }
}

export default Header
