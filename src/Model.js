import { getData} from './utils/helpers.js'

const routes = ['news', 'newest', 'ask', 'show', 'jobs', 'item', 'user']

const url = route => page => `https://api.hnpwa.com/v0/${route}/${page}.json`

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

const getPath = route => route.split('/')[1]

export const model = {
  routes,
  getPath,
  reqs,
  data: {},
  state: { url: '', route: '', scrollPos: 1, page: 1, profile: '', tabsShowing: false, showPages: false },
  changePage: delta => model => {
    model.state.page = model.state.page + delta
    getData(model)(model.state.route)
  },
  showTabs: model =>
    model.state.tabsShowing = !model.state.tabsShowing,
}
