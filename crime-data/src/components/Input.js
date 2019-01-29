import React from 'react'

const Input = (props) => {
  let {placeholder, handleChange, name} = props;
  return (
    <input name={name} onChange={handleChange} placeholder={placeholder} type='text'></input>
  )
}

export default Input