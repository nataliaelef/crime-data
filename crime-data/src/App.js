import React, { Component } from 'react';
import './App.css';
// import './index.css'
import Input from './components/Input.js'
import Button from './components/Button';
// import Results from './components/Results'
import axios from 'axios';
import {Doughnut} from 'react-chartjs-2';


class App extends Component {

  state = {
    lat: null,
    long: null,
    date: '',
    crimeStats: [],
    errorMessage: '',
    geoPermission: true,
  }

  componentDidMount() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log('reached geolocation')
        this.setState({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        })
        this.fetchCrimeData(this.state.lat, this.state.long);
      }, 
        err => {
          this.setState({
            geoPermission: false,
            errorMessage: err.message
          })}
      );
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(prevProps, prevState, snapshot);
  }

  render() {
    const {crimeStats, geoPermission} = this.state;
    const crimeChart = this.generateChart(crimeStats)

    let buttons = !geoPermission ? 
    (
      <>
        <Input type='text' handleChange={this.handleChange} name='lat' placeholder='enter latitude'/>
        <Input type='text' handleChange={this.handleChange} name='long' placeholder='enter longitude'/>
        <Button type='submit' handleClick={this.handleClick} />
      </>
    ) : null;

    return (
      <div className="App">
        <h1>Crimewatch!</h1>
        <Input handleChange={this.handleChange} type='date' name='date'/>
        {buttons}
        <Doughnut data={crimeChart}/>
      </div>
    );
  }

  handleChange = (e) => {
    const {name, value} = e.target;
    if (e.target.type === 'date') {
    let formattedDate = e.target.value.slice(0, 7)
      this.setState({
        date: formattedDate,
      })
      const {lat, long} = this.state;
      this.fetchCrimeData(lat, long, formattedDate)
    } else {
      this.setState({
        [name]: value
      })
    }
  }

  handleClick = (e) => {
    e.preventDefault()
    if(e.target.type === 'submit') {
      const {lat, long} = this.state;
      this.fetchCrimeData(lat, long);
    }
  }

  fetchCrimeData = (lat, long, date) => {
    const url = date ? `https://data.police.uk/api/crimes-street/all-crime?lat=${lat}&lng=${long}&date=${date}` : `https://data.police.uk/api/crimes-street/all-crime?lat=${lat}&lng=${long}`
    axios.get(url)
      .then(res => {
        this.setState({
          crimeStats: res.data
        })
      })
      .catch(err => {
        this.setState({
          errorMessage: `${err.message} <===== fetchCrimeData`
        })
      })
  }

  formatCrimes = (crimeStats) => {
      const cateoryObject = crimeStats.reduce((acc, {category}) => {
        acc[category] = ++acc[category] || 1;
        return acc
      }, {})
      return Object.entries(cateoryObject);
  }

  generateChart = (crimeStats) => {
    const crimes = this.formatCrimes(crimeStats)
    const categories = crimes.reduce((acc, curr) => {
      acc[0].push(curr[0])
      acc[1].push(curr[1])
      return acc;
    },[[], []])
    const chart = {
      labels: [...categories[0]],
      datasets: [
        {
          data: [...categories[1]],
          backgroundColor: [
            '#FF6633', 
            '#FFB399', 
            '#FF33FF', 
            '#FFFF99', 
            '#00B3E6', 
            '#E6B333', 
            '#3366E6', 
            '#999966', 
            '#99FF99', 
            '#B34D4D',
            '#80B300', 
            '#809900', 
            '#E6B3B3', 
            '#6680B3'
          ],

        }
      ]
    }
    return chart;
  }
}

export default App;
