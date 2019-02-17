import animate from 'animejs'

export const animateEntrance = ({ dom }) =>
  dom.animate(
    [
      {
        backgroundPosition: '0%50%',
        opacity: 0,
        // transform: 'rotate(30deg)',
      },
      {
        backgroundPosition: '0%50%',
        opacity: 1,
        // transform: 'rotate(0) ',
      },
    ],
    {
      duration: 850,
    }
  )

export const animateChildrenEntrance = ({ dom }) => {
  let children = [ ...dom.children ]

  let side = { 0: '90%', 1: '-90%' }

  return children.map((child, idx) => {
    setTimeout(() => {
      child.animate([ { transform: `translate3d(${side[idx]},0,0)`, opacity: 0 }, { transform: 'none', opacity: 1 } ], {
        duration: 850,
      })
    }, (idx + 1) * 200)
  })
}

export const animateExit = (dom) => {
  let anim = animate([ { transform: 'none', opacity: 1 }, { transform: 'translate3d(25%,100%,0)', opacity: 0 } ])

  let waapi = dom.animate(anim, {
    duration: 850,
  })

  return new Promise((resolve) => {
    waapi.onfinish = function() {
      resolve()
    }
  })
}

export const animateChildrenExit = (dom) => {
  let children = [ ...dom.children ]

  let anim = animate([ { transform: 'none', opacity: 1 }, { transform: 'translate3d(25%,100%,0)', opacity: 0 } ])

  let waapi = children.map((child) =>
    child.animate(anim, {
      duration: 850,
    })
  )

  return new Promise((resolve) => {
    waapi.onfinish = function() {
      resolve()
    }
  })
}

export const animateFadeIn = ({ dom }) => {
  dom.style.opacity = 0
  dom.style.transition = 'opacity .4s ease-in-out'

  return setTimeout(() => {
    dom.style.opacity = 1
  })
}

export const slideIn = ({ dom }) => {
  let children = [ ...dom.children ]
  console.log(children)
  return children.map((child, idx) => {
    return setTimeout(() => {
      console.log('dom', child)
      child.style.transition = '0.5s ease-out'
      child.animate([
        {
          // transformOrigin: 'top',
          opacity: 0,
          transform: 'translateY(-20%)',
        },
        {
          opacity: 1,
          transform: 'translateY(0%)',
        },
      ])
      // child.style.opacity = 1
    }, (idx + 1) * 805)
  })
}

export const animateChildrenFadeIn = ({ dom }) => {
  let children = [ ...dom.children ]
  return children.map((child, idx) => {
    child.style.opacity = 0
    child.style.transition = 'opacity .2s ease-in-out'

    return setTimeout(() => {
      child.style.opacity = 1
    }, (idx + 1) * 850)
  })
}

export const animateFadeOut = ({ dom }) => {
  let anim = [
    { transition: 'opacity .4s ease-in-out' },
    { transform: 'none', opacity: 1 },
    { transform: 'translate3d(25%,100%,0)', opacity: 0 },
  ]
  let waapi = dom.animate(anim, {
    duration: 850,
  })

  return new Promise((resolve) => {
    waapi.onfinish = function() {
      resolve()
    }
  })
}
