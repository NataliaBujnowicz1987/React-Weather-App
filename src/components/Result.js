import React from 'react';
import './Result.css'

const Result = (props) => {

    // Destructuring is a way of accessing multiple properties stored in objects and arrays and assign them to their own variables
    const { date, city, country, sunrise, sunset, temp, pressure, wind, description, humidity, icon, err } = props.weather;

    let content = null;

    // conditional statement - if we don't have error and city is added then do this:
    if (!err && city) {

        // to display correct and readable time:
        const sunriseTime = new Date(sunrise * 1000)
            .toLocaleTimeString();
        const sunsetTime = new Date(sunset * 1000)
            .toLocaleTimeString();
        const cityUpper = city.toUpperCase();

        content = (
            <>
                <h2>Weather for <em>{cityUpper}, {country}</em></h2>
                <p><b>Date:</b> {date}</p>
                <hr />

                <p><b>Temperature:</b> {temp} &#176;C</p>
                <img src={`http://openweathermap.org/img/w/${icon}.png`} alt="#" />
                <p><b>Description:</b> {description}</p>
                <p><b>Humidity:</b> {humidity}%</p>

                <p><b>Wind:</b> {wind} m/s</p>
                <p><b>Presure:</b> {pressure} hPa</p>

                <p><b>Sunrise:</b> {sunriseTime}</p>
                <p><b>Sunset:</b> {sunsetTime}</p>
            </>
        )
    }

    return (
        <div className="result">
            {/* if there will be error display this message + city name, if there won't error display content */}
            {err ? `Sorry, we cannot find ${city}` : content}
        </div>
    );
}

export default Result;