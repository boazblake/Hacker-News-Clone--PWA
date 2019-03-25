
const routes = ['news', 'newest', 'ask', 'show', 'jobs', 'item/:key', 'user:/key']

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
  model.state.showComment = false
  model.state.comment = {}
  model.state.route = route
  let path = model.getPath(route)
  model.data[route] ? model.data[route] : (model.data[route] = { data: [] })
  model.reqs.http(model)(model.reqs.urls[path](model.state.page))(route)
}

const getComments = model => route => id => {
  model.state.prev = model.state.route
  model.state.route = route
  model.data[route] ? model.data[route] : (model.data[route] = { data: [] })
  model.reqs.http(model)(model.reqs.urls['item/:key'](id))(route)
}

const getPath = route => route.split('/')[1]

const state = {
  key: '',
  url: '',
  route: '',
  page: 1,
  profile: '',
  tabsShowing: false,
  title: '',
  comment: {},
}


const toggleComments = ({model, key, level}) =>
  model.state.comment[`${key}-${level}`] ?
    model.state.comment[`${key}-${level}`] = !model.state.comment[`${key}-${level}`] : model.state.comment[`${key}-${level}`] = true


export const model = {
  getComments,
  getData,
  routes,
  getPath,
  reqs,
  data: {},
  state,
  toggleComments,
}
