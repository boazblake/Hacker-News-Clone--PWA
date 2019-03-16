import m from 'mithril'
import { animateSidebarEntrance,slideModalOut } from '../utils/animations.js'

const Modal = {
  oncreate: animateSidebarEntrance,
  onbeforeremove:slideModalOut,
  view: ({ children }) => m('.navigationModal', children),
}

export default Modal
