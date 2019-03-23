import m from 'mithril'
import { animate, animateChildrenLimitsEntrance } from '../utils/animations.js'


const Footer = {
  oncreate: animate('slideUp'),
  view: () => m('footer.footer', {
    oncreate:animateChildrenLimitsEntrance, id: 'footer',
  },
  'content served from https://api.hnpwa.com/',
  ),
}

export default Footer
