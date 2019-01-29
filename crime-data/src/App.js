import React, { Component } from 'react';
import './App.css';
// import './index.css'
import Input from './components/Input.js'
import Button from './components/Button';

class App extends Component {

  state = {
    lat: null,
    long: null,
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
    return (
      <div className="App">
        <h1>Crimewatch!</h1>
        <Input handleChange={this.handleChange} name='lat' placeholder='enter latitude'/>
        <Input handleChange={this.handleChange} name='long' placeholder='enter longitude'/>
        <Button />
      </div>
    );
  }
  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    })
  }

  handleSubmit = () => {

  }
}

export default App;
