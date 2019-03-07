const Body = () => {
  return {
    view: ({ attrs: { children } }) => m('section.content', { id: 'content' }, children),
  }
}

export default Body
