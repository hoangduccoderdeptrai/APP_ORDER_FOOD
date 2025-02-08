import { React, useState, useEffect } from 'react'

const UseResponsive = () => {
  const [screenSize, setScreenSize] = useState('')
  const breakpoints = {
    sm: 640,
    md: 760,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  }
  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth
      if (width >= breakpoints['lg']) setScreenSize('lg')
      else if (width >= breakpoints['md']) setScreenSize('md')
      else setScreenSize('sm')
    }
    updateScreenSize()
    const resizeObserve = new ResizeObserver(updateScreenSize)
    resizeObserve.observe(document.body)
    return () => {
      resizeObserve.disconnect()
    }
  }, [])

  return screenSize
}

export default UseResponsive
