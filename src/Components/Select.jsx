import React, { useId } from 'react'

function Select({

    options,
    label,
    classname = '',
    ...props

}, ref) {
    const id = useId()
  return (
    <div className='select'>
        {
            label && <label htmlFor={id}  className=''>{label} : </label>
        }

        <select  id={id } ref={ref} className={`selectoption ${classname}`} {...props}>

{            options?.map((option) => <option key={option} value={option}>{option}</option>)}

        </select>
      
    </div>
  )
}

export default React.forwardRef(Select)
