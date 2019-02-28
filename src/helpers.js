import m from 'mithril'

export const isEmpty = data => data.length == 0

export const darken = ({ r, g, b }) => `rgba(${r / 2},${g / 2},${b / 2},1)`

const loadData = model => url => route =>
  m
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

export const getData = model => path => {
  model.state.route = path
  model.data[path] ? model.data[path] : (model.data[path] = { data: [], limit: 1 })
  let start = model.data[path].data.length
  loadData(model)(model.reqs.urls[path](start, model.state.limit))(path)
}

export const infiniteScroll = model => e => {
  console.log(e)
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
  model.showTabs = false
  return getData(model)(path)
}
