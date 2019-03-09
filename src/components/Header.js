import m from 'mithril'
import Hamburger from './Hamburger.js'
import { animateChildrenLimitsEntrance } from '../animations.js'

const Selector = {
  view: ({ attrs: { model } }) =>
    m(
      '.limits',
      {
        oncreate: ({ dom }) => {
          console.log(dom)
          animateChildrenLimitsEntrance({ dom })
        },
      },
      model.limits.map((limit, idx) =>
        m(
          'button.btn.limit',
          {
            onclick: () => {
              model.state.limit = limit
              model.showLimits = false
            },
            key: idx,
          },
          limit
        )
      )
    ),
}

const ChangeLimits = () => ({
  view: ({ attrs: { model } }) =>
    m('.changeLimits', [
      m(
        'button.changeLimitBtn',
        {
          onclick: () => {
            model.showLimits = !model.showLimits
          },
        },
        'Change Limit'
      ),
      model.showLimits && m(Selector, { model }),
    ]),
})

const Header = () => {
  return {
    view: ({ attrs: { model } }) =>
      m(
        'header.header',
        {
          id: 'header',
        },
        [ m(Hamburger, { model }), m(ChangeLimits, { model }) ]
      ),
  }
}

export default Header
