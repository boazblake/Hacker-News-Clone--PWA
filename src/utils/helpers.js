export const isEmpty = data => data.length == 0

export const getData = model => path => {
  model.state.route = path
  model.data[path] ? model.data[path] : (model.data[path] = { data: [], limit: 1 })
  let start = model.data[path].data.length
  model.reqs.http(model)(model.reqs.urls[path](start, model.state.limit))(path)
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
  model.state.scrollPos = 1
  model.state.tabsShowing = false
  return getData(model)(path)
}
