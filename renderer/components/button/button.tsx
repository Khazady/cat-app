import React from 'react'
import buttonStyles from './button.module.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button className={buttonStyles.button} {...props}>
      {children}
    </button>
  )
}

export default Button
