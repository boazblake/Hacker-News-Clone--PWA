import m from 'mithril'
import Hamburger from './Hamburger.js'
import { animate } from '../utils/animations.js'


const Paginate = {
  view: ({ attrs: { model } }) =>
    m('.btnContainer', [
      m(
        'button.btn',
        {
          onclick: () => model.changePage(-1)(model),
        },
        'Prev'
      ), m(
        'button.btn',
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
      },[
        m(Hamburger, { model }),
        model.state.showComment
          ? m('button.btn', {onclick: () => console.log('back to ...', model)},'Go BAck Up')
          : m(Paginate, { model }),
      ]
    ),
}

export default Header
