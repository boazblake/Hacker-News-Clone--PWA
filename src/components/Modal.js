import { animateSidebarEntrance,slideModalOut } from '../animations.js'

const Modal = {
  oncreate: animateSidebarEntrance,
  onbeforeremove:slideModalOut,
  view: ({ children }) => m('.navigationModal', children),
}

export default Modal
