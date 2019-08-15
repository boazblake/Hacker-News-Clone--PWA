import m from 'mithril'

const Footer = {
  view: () =>
    m(
      'footer.footer',
      {
        id: 'footer',
      },
      'content served from https://api.hnpwa.com/'
    ),
}

export default Footer
