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
    <div className='inputandlabel'>
        {
            label && <label  htmlFor={id}>{label}</label> 
        }
        
        {
            <input type={type} placeholder={placeholder} className={`inputbox ${classname}`} name="" id={id} {...props}  ref={ref}/>
        }

       
    </div>
  )
})

export default Input