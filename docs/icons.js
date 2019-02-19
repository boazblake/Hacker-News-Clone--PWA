import m from 'mithril'

export const LeftArrow = m(
  'svg',
  { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 20 20' },
  m('path', { d: 'M3.828 9l6.071-6.071-1.414-1.414L0 10l.707.707 7.778 7.778 1.414-1.414L3.828 11H20V9H3.828z' })
)

export const rightArrow = m(
  'svg',
  { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 20 20' },
  m('path', {
    d: '16.172 9 10.101 2.929 11.515 1.515 20 10 19.293 10.707 11.515 18.485 10.101 17.071 16.172 11 0 11 0 9',
  })
)

const icons = { LeftArrow, rightArrow }

export default icons
