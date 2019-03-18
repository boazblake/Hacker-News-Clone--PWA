import m from 'mithril'
import { animate } from '../utils/animations.js'

const Body = {
  oncreate: animate('slideUp'),
  view: ({attrs:{ children }}) => m('section.content', { id: 'content' }, children),
}

export default Body
