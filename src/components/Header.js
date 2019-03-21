import m from 'mithril'
import Hamburger from './Hamburger.js'
import { animate } from '../utils/animations.js'


const Paginate = {
  view: ({ attrs: { model } }) =>
    m('.paginateContainer', [
      m(
        'button.paginateBtn',
        {
          onclick: () => model.changePage(-1)(model),
        },
        'Prev'
      ), m(
        'button.paginateBtn',
        {
          onclick: () => model.changePage(+1)(model),
        },
        'Next'
      ),
    ]),
}

const Header = {
  oncreate: animate('slideDown'),
  view: ({ attrs: { model } }) =>
    m(
      'header.header',
      {
        id: 'header',
      },
      [ m(Hamburger, { model }), m(Paginate, { model }) ]
    ),
}

export default Header
