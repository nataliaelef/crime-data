import React from 'react'

const Input = (props) => {
  let {placeholder, handleChange, name, type} = props;
  return (
    <input name={name} onChange={handleChange} placeholder={placeholder} type={type}></input>
  )
}

export default Input