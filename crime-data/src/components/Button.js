import React from 'react'

const Button = (props) => {
  const {handleClick, type} = props;
  return (
    <button onClick={handleClick} type={type}>Submit</button>
  )
}

export default Button