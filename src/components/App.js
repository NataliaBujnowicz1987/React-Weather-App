import React, { Component } from 'react';
import Form from './Form';
import Result from './Result';
import './App.css';

import BackgroundSlider from 'react-background-slider'
import image1 from '../img/img1.jpg';
import image2 from '../img/img2.jpg';
import image3 from '../img/img3.jpg';
import image4 from '../img/img4.jpg';
import image5 from '../img/img5.jpg';
import image6 from '../img/img6.jpg';
import image7 from '../img/img7.jpg';
import image8 from '../img/img8.jpg';
import image9 from '../img/img9.jpg';

const APIKey = '93e33ce016b2524c5f37cceded476cce';

//class component with state
class App extends Component {
  state = {
    value: '',
    date: '',
    city: '',
    country: '',
    sunrise: '',
    sunset: '',
    temp: '',
    pressure: '',
    wind: '',
    humidity: '',
    description: '',
    icon: '09d',
    err: false,
  }

  // here we change state

  // main function in our app, we collect data from the user
  handleInputChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }


  // active button
  handleCitySubmit = (e) => {
    // preventDefault prevents a browser reload
    e.preventDefault()

    const API = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=${APIKey}&units=metric`;

    fetch(API)
      .then(response => {
        if (response.ok) {
          return response
        }
        throw Error("Sorry, something is wrong...")
      })
      .then(response => response.json())

      // here we have access to data and we want to do something with these data (setState)
      .then(data => {
        const time = new Date().toLocaleString();

        // prevState holds is the value of state before the setState was triggered
        this.setState(prevState => ({
          err: false,
          date: time,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          temp: data.main.temp,
          pressure: data.main.pressure,
          wind: data.wind.speed,
          humidity: data.main.humidity,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          city: prevState.value,
          country: data.sys.country,
        }))
      })

      .catch(err => {
        console.log(err);
        this.setState(prevState => {
          return {
            err: true,
            city: prevState.value
          }
        })
      })
  }

  render() {
    return (
      <div className="app">

        <BackgroundSlider
          images={[image1, image2, image3, image4, image5, image6, image7, image8, image9]}
          duration={5} transition={2} />

        {/* controlled components - Form and Result*/}

        {/* we pass the state to other components by using props (here we called them value, change, submit, weather) */}
        <Form
          value={this.state.value}
          change={this.handleInputChange}
          submit={this.handleCitySubmit}
        />

        <Result weather={this.state} />
      </div>
    )
  }
}

export default App;
