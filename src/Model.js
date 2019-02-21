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

const themes = type => {
  let theme = {
    light: {
      sidebar: 'rgba(41,128,185 ,0.9)',
      tab: {
        active: '4px solid rgba(41,128,185 ,1)',
        inactiveHover: '4px solid rgba(41,128,185 ,.5)',
      },
      item: 'rgba(41,18,185 ,.2)',
      component: 'rgba(41,128,185 ,.1)',
    },
    dark: {
      sidebar: 'rgba(52,73,94 ,.9)',
      tab: {
        active: '4px solid rgba(52,73,94 ,1)',
        inactiveHover: '4px solid rgba(52,73,94 ,.5))',
      },
      item: 'rgba(52,73,94 ,.2)',
      component: 'rgba(52,73,94 ,.1)',
    },
  }

  return theme[type]
}

let mode = 'light'

export const model = {
  sidebar: { isOpen: true, modify: sb => !sb.isOpen },
  numItems: 1,
  data: {},
  state: { url: '', route: '' },
  reqs,
  mode,
  theme: mode => themes(mode),
  updateTheme: model => mode => (model.mode = mode),
}
