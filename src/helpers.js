import m from 'mithril'

export const isEmpty = data => data.length == 0

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
