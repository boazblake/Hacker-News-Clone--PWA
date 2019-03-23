export const isEmpty = data => data.length == 0

export const infiniteScroll = model => e => {
  let route = model.state.route
  let length = model.data[route].data.length
  let setpoint = 10 * length * model.state.scrollPos
  if (e.target.scrollTop - model.state.scrollPos >= setpoint) {
    model.state.scrollPos++ + e.target.scrollTop
    if (length < model.data[route].limit) {
      model.getData(model)(route)
    }
  }
}

export const init = model => path => {
  model.state.page = 1
  model.state.scrollPos = 1
  model.state.tabsShowing = false
  let id =  path.split('/')[2]
  let route = path.split('/')[1]
  return id ? model.getComments(model)(route)(id) : model.getData(model)(path)
}

export const makeRoutes = model => toRoute => (routes, route) => {
  routes[`/${route}`] = toRoute(model)
  return routes
}
