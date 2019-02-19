const url = item => `https://jsonplaceholder.typicode.com${item}`

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

const userVm = ({ address, key }) => ({
  address,
  key,
})

const itemVm = ({ item, key }) => ({
  item,
  key,
})

export const model = {
  sidebar: { isOpen: true, modify: sb => !sb.isOpen },
  numItems: 1,
  data: {},
  state: { url: '', route: '' },
  reqs,
  userVm,
  itemVm,
}
