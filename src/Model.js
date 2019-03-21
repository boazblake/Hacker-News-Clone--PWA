const routes = ['/posts', '/comments', '/albums', '/photos', '/todos', '/users']

const url = item => (start, limit) => `https://jsonplaceholder.typicode.com${item}?_start=${start}&_limit=${limit}`

const urls = routes.reduce((req, item) => {
  req[item] = url(item)
  return req
}, {})

const http = model => url => route => m
  .request({
    url,
    method: 'GET',
    extract: xhr => {
      model.data[route].limit = parseInt(xhr.getResponseHeader('x-total-count'))
      return JSON.parse(xhr.responseText)
    },
  })
  .then(data => {
    model.data[route].data = model.data[route].data.concat(data)
    return model
  })

const reqs = {
  urls,
  http,
}

export const model = {
  routes,
  reqs,
  limits: [ 30, 40, 50, 60, 70, 80, 90, 100 ],
  data: {},
  state: { url: '', route: '', scrollPos: 1, limit: 30, profile: '', tabsShowing: false, showLimits: false },
  toggleLimits: model =>
    model.state.showLimits = !model.state.showLimits,
  showTabs: model =>
    model.state.tabsShowing = !model.state.tabsShowing,
}
