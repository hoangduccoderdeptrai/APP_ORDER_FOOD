import React, { useRef } from 'react'

const BubblyButton = ({ children, onClick, className, disabled }) => {
  const buttonRef = useRef(null)

  const animateButton = (e) => {
    e.preventDefault()

    if (buttonRef.current) {
      buttonRef.current.classList.remove('animate')
      void buttonRef.current.offsetWidth
      buttonRef.current.classList.add('animate')
    }

    if (onClick) onClick(e)
  }

  return (
    <button
      disabled={disabled}
      ref={buttonRef}
      className={`${disabled ? `pointer-events-none` : ``} ${className} bubbly-button`}
      onClick={animateButton}
    >
      {children}
    </button>
  )
}

export default BubblyButton
