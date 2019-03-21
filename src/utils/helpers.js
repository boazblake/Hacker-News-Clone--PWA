export const isEmpty = data => data.length == 0

export const getData = model => route => {
  model.state.route = route
  let path = model.getPath(route)
  model.data[route] ? model.data[route] : (model.data[route] = { data: []  })
  model.reqs.http(model)(model.reqs.urls[path](model.state.page))(route)
}

export const infiniteScroll = model => e => {
  let route = model.state.route
  let length = model.data[route].data.length
  let setpoint = 10 * length * model.state.scrollPos
  if (e.target.scrollTop - model.state.scrollPos >= setpoint) {
    model.state.scrollPos++ + e.target.scrollTop
    if (length < model.data[route].limit) {
      getData(model)(route)
    }
  }
}

export const init = model => path => {
  model.state.page = 1
  model.state.tabsShowing = false
  return getData(model)(path)
}

export const makeRoutes = model => toRoute => (routes, route) => {
  routes[`/${route}`] = toRoute(model)
  return routes
}
