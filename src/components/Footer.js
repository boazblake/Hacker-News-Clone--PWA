import m from 'mithril'
import { animate, animateFooterEntrance } from '../utils/animations.js'


const Footer = {
  oncreate: animate('slideUp'),
  view: () => m('footer.footer', {
    oncreate: animateFooterEntrance, id: 'footer',
  },
  'content served from https://api.hnpwa.com/',
  ),
}

export default Footer
