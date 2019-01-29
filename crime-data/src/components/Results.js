import React from 'react'
import {Doughnut} from 'react-chartjs-2';

const Results = (props) => {
  const {crimeChart} = props;


  return (
    crimes.map((crime) => {
      return (
      <p><span>{crime[0]}</span> : <span>{crime[1]}</span></p>
      )
    })
    
  )
}

export default Results