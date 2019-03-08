const Modal = () => {
  return {
    oncreate: ({ dom, children }) => {
      dom.style.opacity = 1
      children.map(x => {
        x.dom.children.style.opacity = 1
      })
      m.render(dom, children)
    },
    view: ({ children }) => children,
  }
}

export default Modal
