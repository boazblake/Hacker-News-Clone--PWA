import m from 'mithril'
import Hamburger from './Hamburger.js'
import { animateChildrenLimitsEntrance, animateChildrenLimitsExit, animate } from '../utils/animations.js'


const Selector = {
  onbeforeremove: animateChildrenLimitsExit,
  view: ({ attrs: { model } }) =>
    m(
      '.limits',
      model.limits.map((limit, idx) =>
        m(
          'button.btn.limit',
          {
            oncreate: animateChildrenLimitsEntrance(idx),
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

const ChangeLimits = {
  view: ({ attrs: { model } }) =>
    m('.changeLimits', [
      m(
        'button.changeLimitBtn',
        {
          onclick: () => (model.showLimits = !model.showLimits),
        },
        'Change Limit'
      ),
      model.showLimits && m(Selector, { model }),
    ]),
}

const Header = {
  oncreate: animate('slideDown'),
  view: ({ attrs: { model } }) =>
    m(
      'header.header',
      {
        id: 'header',
      },
      [ m(Hamburger, { model }), m(ChangeLimits, { model }) ]
    ),
}

export default Header
