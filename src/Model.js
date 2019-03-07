const url = item => (start, limit) => `https://jsonplaceholder.typicode.com${item}?_start=${start}&_limit=${limit}`

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

export const model = {
  limits: [ 30, 40, 50, 60, 70, 80, 90, 100 ],
  data: {},
  state: { url: '', route: '', scrollPos: 1, limit: 30, profile: '' },
  reqs,
  showModes: false,
  showLimits: false,
  showTabs: model => {
    model.tabsShowing = !model.tabsShowing
  },
  tabsShowing: false,
}
