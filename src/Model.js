const url = item => `https://jsonplaceholder.typicode.com${item}`

const http = url => method => (data = null) => m.request({ url, method, data })

const options = [ '/posts', '/comments', '/albums', '/photos', '/todos', '/users' ]

const urls = options.reduce((req, item) => {
  req[item] = url(item)
  return req
}, {})

const reqs = {
  urls,
  http,
}

const themes = mode => {
  let theme = {
    light: {
      sidebar: 'rgba(41,128,185 ,0.9)',
      tab: {
        activeBorder: '4px solid rgba(41,128,185 ,1)',
        inactiveBorder: '4px solid rgba(41,128,185 ,.5)',
      },
      item: 'rgba(41,18,185 ,.2)',
      component: 'rgba(41,128,185 ,.1)',
    },
    dark: {
      sidebar: 'rgba(52,73,94 ,.9)',
      tab: {
        activeBorder: '4px solid rgba(52,73,94 ,1)',
        inactiveBorder: '4px solid rgba(52,73,94 ,.5)',
      },
      item: 'rgba(52,73,94 ,.2)',
      component: 'rgba(52,73,94 ,.1)',
    },
  }

  return theme[mode]
}

export const model = {
  sidebar: { isOpen: true, modify: sb => !sb.isOpen },
  numItems: 1,
  data: {},
  state: { url: '', route: '' },
  reqs,
  mode: 'light',
  themes,
  changeMode: () => {
    model.mode == 'light' ? (model.mode = 'dark') : (model.mode = 'light')
  },
}
