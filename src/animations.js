export const animateComponentEntrance = idx => ({ dom }) => {
  dom.style.opacity = 0
  return setTimeout(() => {
    dom.classList.toggle('stretchRight')
    dom.style.opacity = 1
  }, idx * 100 + 20)
}

export const animateSidebarEntrance = ({ dom }) => {
  dom.style.opacity = 0
  dom.classList.toggle('slideRight')
  dom.style.opacity = 1
}

export const animateChildrenEntrance = ({ dom }) => {
  let children = [ ...dom.children ]

  return children.map((child, idx) => {
    child.style.opacity = 0
    setTimeout(() => {
      child.classList.toggle('slideRight')
      child.style.opacity = 1
    }, (idx + 1) * 10)
  })
}

export const animateChildrenLimitsEntrance = idx => ({ dom }) => {
  dom.style.opacity = 0
  setTimeout(() => {
    dom.classList.toggle('slideDown')
    dom.style.opacity = 1
  }, (idx + 1) * 200)
}

export const animate = dir => ({ dom }) => {
  dom.style.opacity = 0
  setTimeout(() => {
    dom.classList.toggle(dir)
    dom.style.opacity = 1
  },  200)
}

export const slideModalOut = ({ dom }) => {
  return new Promise(() => {
    dom.classList.remove('slideRight')
    return setTimeout(()=> {
      dom.classList.add('reverseAnimation', 'slideRight')
    } , 200)
  })
}


export const animateChildrenLimitsExit = ({ dom }) =>
  new Promise(() => {
    [ ...dom.children ].reverse().map((child, idx) => {
      return setTimeout(() => {
        child.style.display = 'none'
      }, idx * 100)
    })
  })

