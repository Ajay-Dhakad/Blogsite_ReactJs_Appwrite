import React, { useId } from 'react'

function Select({

    options,
    label,
    classname = '',
    ...props

}, ref) {
    const id = useId()
  return (
    <div id='selectoption'>
        {
            label && <label htmlFor={id}  className=''></label>
        }

        <select  id={id } ref={ref} className={`select ${classname}`} {...props}>

{            options?.map((option) => <option key={option} value={option}>{option}</option>)}

        </select>
      
    </div>
  )
}

export default React.forwardRef(Select)
