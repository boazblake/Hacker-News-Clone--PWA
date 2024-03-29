import m from "mithril"
import { without } from "ramda"
import Modal from "./Modal.js"

const mithrilIcon = m("path", {
  d: "M31.716,13.5C31.699,6.47,25.974,0.755,18.94,0.755c-7.045,0-12.777,5.732-12.777,12.777\n\t\t\tc0,0.022,0.004,0.043,0.004,0.065C2.477,15.84,0,19.887,0,24.511c0,7.046,5.731,12.777,12.777,12.777\n\t\t\tc2.268,0,4.395-0.601,6.244-1.642c1.849,1.041,3.977,1.642,6.245,1.642c7.046,0,12.777-5.732,12.777-12.777\n\t\t\tC38.043,19.82,35.495,15.722,31.716,13.5z M19.021,32.961c-2.312-1.713-3.906-4.341-4.22-7.352c1.3,0.448,2.689,0.702,4.139,0.702\n\t\t\tc1.514,0,2.96-0.278,4.307-0.764C22.949,28.584,21.349,31.236,19.021,32.961z M8.517,14.898c1.303-0.579,2.743-0.909,4.26-0.909\n\t\t\tc1.475,0,2.879,0.307,4.154,0.858c-2.114,1.826-3.629,4.325-4.195,7.167C10.473,20.352,8.898,17.814,8.517,14.898z M18.94,24.055\n\t\t\tc-1.457,0-2.846-0.298-4.109-0.837c0.361-2.928,1.929-5.482,4.19-7.157c2.243,1.662,3.802,4.187,4.18,7.085\n\t\t\tC21.897,23.727,20.457,24.055,18.94,24.055z M21.111,14.846c1.275-0.55,2.679-0.858,4.154-0.858c1.457,0,2.846,0.298,4.11,0.837\n\t\t\tc-0.356,2.885-1.883,5.404-4.089,7.082C24.704,19.108,23.199,16.65,21.111,14.846z M18.94,3.01c5.432,0,9.915,4.137,10.466,9.425\n\t\t\tc-1.3-0.447-2.689-0.702-4.14-0.702c-2.268,0-4.396,0.601-6.245,1.642c-1.848-1.041-3.975-1.642-6.244-1.642\n\t\t\tc-1.514,0-2.96,0.278-4.307,0.763C8.993,7.179,13.488,3.01,18.94,3.01z M12.777,35.034c-5.803,0-10.523-4.72-10.523-10.523\n\t\t\tc0-3.418,1.645-6.451,4.177-8.375c0.744,3.581,2.999,6.607,6.059,8.408c0.011,3.847,1.735,7.293,4.442,9.631\n\t\t\tC15.656,34.727,14.253,35.034,12.777,35.034z M25.266,35.034c-1.475,0-2.879-0.307-4.154-0.858\n\t\t\tc2.715-2.345,4.444-5.804,4.444-9.664c0-0.022-0.004-0.044-0.004-0.065c3.007-1.829,5.209-4.852,5.918-8.416\n\t\t\tc2.613,1.917,4.319,4.999,4.319,8.48C35.788,30.313,31.068,35.034,25.266,35.034z",
  style: { fill: "white" },
})

const ModalStuff = {
  init: () => {},
  close: (model) => model.toggleModal(model),
  title: "About",
  contents: [
    m(
      "p",
      "built with ",
      m(
        "a",
        { rel: "noopener", target: "_blank", href: "https://mithril.js.org" },
        " Mithril.JS"
      ),
      " and webpack"
    ),
    m(
      "p",
      "source code: ",
      m(
        "a",
        {
          rel: "noopener",
          target: "_blank",
          href: "https://github.com/boazblake/mithril-hn-pwa",
        },
        "can be found here"
      )
    ),
  ],
  footer: [
    m("p", [
      "made by ",
      m(
        "a",
        {
          rel: "noopener",
          target: "_blank",
          href: "https://linkedin.com/in/boazblake/",
        },
        "B Blake"
      ),
    ]),
  ],
}

const Tab = ({ attrs: { key } }) => {
  return {
    view: ({ attrs: { tab, isActive } }) =>
      m(
        "li",
        m(
          m.route.Link,
          {
            class: `tab${isActive ? " bold" : ""}`,
            key,
            id: `${tab}`,
            href: `/${tab}`,
          },
          tab
        )
      ),
  }
}

const Header = ({ attrs: { model } }) => {
  let tabs = Object.keys(model.reqs.urls)
  let navTabs = without(["item/:key", "user/:key"], tabs)
  return {
    view: ({ attrs: { model } }) =>
      m(
        "nav",
        {
          id: "header",
        },
        m(
          "ul",
          m(
            "li",
            m("svg", { onclick: () => model.toggleModal(model) }, mithrilIcon)
          ),
          navTabs.map((tab, idx) =>
            m(Tab, {
              key: idx,
              isActive: model.state.route == `/${tab}`,
              tab,
            })
          ),
          model.state.showModal ? m(Modal, { ...ModalStuff, model }) : ""
        )
      ),
  }
}

export default Header
