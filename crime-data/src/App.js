import React, { Component } from 'react';
import './App.css';
// import './index.css'
import Input from './components/Input.js'
import Button from './components/Button';
import Results from './components/Results'
import axios from 'axios';

class App extends Component {

  state = {
    lat: null,
    long: null,
    crimeStats: [],
    errorMessage: '',
  }
  componentDidMount() {
    // console.log('hello')
    // window.navigator.geolocation.getCurrentPosition(position => {
    //   this.setState({lat: position.coords.latitude})
    // }, 
    //   err => {this.setState({errorMessage: err.message})}
    // );
  }
  render() {
    const {crimeStats} = this.state;
    const crimes = crimeStats.reduce((acc, crime) => {

    }, [])
    return (
      <div className="App">
        <h1>Crimewatch!</h1>
        <Input handleChange={this.handleChange} name='lat' placeholder='enter latitude'/>
        <Input handleChange={this.handleChange} name='long' placeholder='enter longitude'/>
        <Button type='submit' handleClick={this.handleClick} />
        <Results />
      </div>
    );
  }
  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    })
  }

  handleClick = (e) => {
    e.preventDefault()
    if(e.target.type === 'submit') {
      const {lat, long} = this.state;
      this.fetchCrimeData(lat, long);
    }
  }

  fetchCrimeData = (lat, long) => {
    const url = `https://data.police.uk/api/crimes-street/all-crime?lat=${lat}&lng=${long}`
    axios.get(url)
      .then(res => {
        this.setState({
          crimeStats: res.data
        })
      })
      .catch(err => {
        this.setState({
          errMessage: err.message
        })
      })
  }


}

export default App;
