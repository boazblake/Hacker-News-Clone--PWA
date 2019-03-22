
const routes = ['news', 'newest', 'ask', 'show', 'jobs', 'item/:key', 'user']

const url = route => page => {
  let path = route.split('/')[0]
  return `https://api.hnpwa.com/v0/${path}/${page}.json`
}

const urls = routes.reduce((req, route) => {
  req[route] = url(route)
  return req
}, {})

const http = model => url => route => m
  .request({
    url,
    method: 'GET',
  })
  .then(data => {
    model.data[route].data = data
    return model
  })

const reqs = {
  urls,
  http,
}

const getData = model => route => {
  console.log(model.reqs.urls, route)
  model.state.route = route
  let path = model.getPath(route)
  model.data[route] ? model.data[route] : (model.data[route] = { data: [] })
  model.reqs.http(model)(model.reqs.urls[path](model.state.page))(route)
}

const getComments = model => route => id => {
  console.log(model.reqs.urls)
  model.state.route = route
  model.data[route] ? model.data[route] : (model.data[route] = { data: [] })
  model.reqs.http(model)(model.reqs.urls['item/:key'](id))(route)
}

const getPath = route => route.split('/')[1]

export const model = {
  getComments,
  getData,
  routes,
  getPath,
  reqs,
  data: {},
  state: { url: '', route: '', scrollPos: 1, page: 1, profile: '', tabsShowing: false, title: '', showComments: false },
  changePage: delta => model => {
    model.state.page = model.state.page + delta
    model.getData(model)(model.state.route)
  },
  showComments: model => model.state.showComments = !model.state.showComments,
  showTabs: model =>
    model.state.tabsShowing = !model.state.tabsShowing,
}
