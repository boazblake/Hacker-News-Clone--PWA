import m from 'mithril'
import { animate, animateChildrenLimitsEntrance } from '../animations.js'

const Footer = {
  oncreate: animate('slideUp'),
  view: () => m('footer.footer', {
    oncreate:animateChildrenLimitsEntrance, id: 'footer',
  }, 'Footer'),
}

export default Footer
