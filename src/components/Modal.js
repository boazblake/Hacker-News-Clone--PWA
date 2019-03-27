import m from 'mithril'
import { animateModalEntrance } from '../utils/animations.js'

const Header = {
  view: ({ attrs: {title,  model} }) => {
    return m('.modal-header', [
      m('h4.title', title),
      m('button.closeBtn', {
        onclick: () => model.toggleModal(model),
      },'X'),
    ])
  },
}

const Content =  {
  view: ({children}) =>
    m('.modal-contents',
      children,
    ),
}

const Footer =  {
  view: ({ children }) =>
    m('.modal-footer',children),
}



const Modal = {
  view: ({ attrs:{title, contents, footer, model }}) =>
    m('section.modalContainer',
      m('.modal', {
        oncreate: animateModalEntrance,
      }, [
        m(Header, { title, model }),
        m(Content, contents),
        m(Footer, footer ),
      ])),
}

export default Modal
