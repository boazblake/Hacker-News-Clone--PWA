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
    dark: {},
  }

  return theme
}

export const model = {
  sidebar: { isOpen: true, modify: sb => !sb.isOpen },
  numItems: 1,
  data: {},
  state: { url: '', route: '' },
  reqs,
  theme: type => themes(type),
}
