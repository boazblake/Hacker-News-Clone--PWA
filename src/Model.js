const url = item => (start, limit) => `https://jsonplaceholder.typicode.com${item}?_start=${start}&_limit=${limit}`

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

const themes = ({ r, g, b }) => ({
  sidebar: `rgba(${r},${g},${b} ,.9)`,
  tab: {
    activeBorder: `4px solid rgba(${r},${g},${b} ,1)`,
    inactiveBorder: `4px solid rgba(${r},${g},${b} ,.5)`,
  },
  item: `rgba(${r},${g},${b} ,.2)`,
  component: `rgba(${r},${g},${b} ,.1)`,
})

const pallette = [
  { name: 'turquise', color: { r: 26, g: 188, b: 156 } },
  { name: 'blue', color: { r: 52, g: 152, b: 219 } },
  { name: 'purple', color: { r: 155, g: 89, b: 182 } },
  { name: 'asphalt', color: { r: 52, g: 73, b: 94 } },
  { name: 'orange', color: { r: 243, g: 156, b: 18 } },
  { name: 'red', color: { r: 192, g: 57, b: 43 } },
  { name: 'silver', color: { r: 189, g: 195, b: 199 } },
]

export const model = {
  sidebar: { isOpen: true, modify: sb => !sb.isOpen },
  limits: [ 30, 40, 50, 60, 70, 80, 90, 100 ],
  data: {},
  state: { url: '', route: '', scrollPos: 1, limit: 30, profile: '' },
  reqs,
  mode: pallette[0].color,
  themes,
  showModes: false,
  showLimits: false,
  showTabs: false,
  pallette,
}
