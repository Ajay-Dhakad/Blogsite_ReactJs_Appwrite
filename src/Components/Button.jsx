import React from 'react'

export default function Button({
    children,
    type='button',
    bgcolor='black',
    textcolor='white', 
    ...props
}) {
  return (
    <button className={`button  ${textcolor}`} {...props}  >{children}</button>
  )
}
