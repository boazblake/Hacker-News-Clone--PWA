import m from 'mithril'

const Header = {
  view: ({ attrs: { title, model, close } }) => {
    return m('.modal-header', [
      m('h4.title', title),
      m(
        'button.closeBtn',
        {
          onclick: () => close(model),
        },
        'X'
      ),
    ])
  },
}

const Content = {
  view: ({ children }) => m('.modal-contents', children),
}

const Footer = {
  view: ({ children }) => m('.modal-footer', children),
}

const Modal = {
  oninit: ({ attrs: { init, model } }) => init(model),
  view: ({ attrs: { title, contents, footer, model, close } }) =>
    m(
      'section.modalContainer',
      m('.modal', {}, [
        m(Header, { title, model, close }),
        m(Content, contents),
        m(Footer, footer),
      ])
    ),
}

export default Modal
