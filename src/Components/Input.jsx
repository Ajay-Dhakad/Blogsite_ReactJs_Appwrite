import React, { useId } from 'react'

 const Input = React.forwardRef( function Input ({

    label,
    placeholder='',
    type = 'text',
    classname = '',
    ...props
 },ref)
 
 {

    const id = useId()

  return (
    <>
        {
            label && <h2 className='labelinput'  htmlFor={id}>{label}</h2> 
        }
        
        {
            <input type={type} placeholder={placeholder} className={`inputbox ${classname}`} name="" id={id} {...props}  ref={ref}/>
        }
</>
       
    
  )
})

export default Input
