import m from 'mithril'

const Body = {
  view: ({ attrs: { children } }) =>
    m('section.content', { id: 'content' }, children),
}

export default Body
