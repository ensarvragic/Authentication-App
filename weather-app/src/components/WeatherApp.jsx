import React, { useState } from 'react';
import './WeatherApp.css'


import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/rain.png';
import search_icon from '../assets/search.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png'


const WeatherApp = () => {

    let api_key = `dd94f859a0e52d6e4767fddf735f04a7`;

    const[wicon, setWicon] = useState(cloud_icon);

    const search = async () => {
        const element = document.getElementsByClassName("cityInput")
        if(element[0].value === ''){
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`

        let response = await fetch(url);
        let data = await response.json();

        const humidity = document.getElementsByClassName('humidity-percent')
        const wind = document.getElementsByClassName('wind-rate')
        const temperature = document.getElementsByClassName('weather-temp')
        const location = document.getElementsByClassName('weather-location')

        humidity[0].innerHTML = data.main.humidity+'%';
        wind[0].innerHTML = Math.floor(data.wind.speed)+'km/h';
        temperature[0].innerHTML = Math.floor(data.main.temp)+'°c';
        location[0].innerHTML = data.name;

        switch (data.weather[0].icon) {
            case '01d':
            case '01n':
                setWicon(clear_icon);
                break;
            case '02d':
            case '02n':
                setWicon(cloud_icon);
                break;
            case '03d':
            case '03n':
                setWicon(drizzle_icon);
                break;
            case '04d':
            case '04n':
                setWicon(drizzle_icon);
                break;
            case '09d':
            case '09n':
                setWicon(rain_icon);
                break;
            case '10d':
            case '10n':
                setWicon(rain_icon);
                break;
            case '13d':
            case '13n':
                setWicon(snow_icon);
                break;
            default:
                setWicon(clear_icon);
        }
    }

  return (
    <div className='container'>
        <div className='top-bar'>
            <input type='text' className='cityInput' placeholder='search'/>
            <div className='serach-icon'onClick={() => {search()}}>
                <img src={search_icon}/>
            </div>
        </div>
        <div className='weather-image'>
            <img src={cloud_icon}/>
        </div>
        <div className="weather-temp">24°c</div>
        <div className="weather-location">London</div>
        <div className="data-container">
            <div className="element">
                <img src={humidity_icon} className='icon'/>
                <div className="data">
                    <div className="humidity-percent">64%</div>
                    <div className="text">Humidity</div>
                </div>
            </div>
            <div className="element">
                <img src={wind_icon} className='icon'/>
                <div className="data">
                    <div className="wind-rate">18 km/h</div>
                    <div className="text">Wind Speed</div>
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default WeatherApp;
