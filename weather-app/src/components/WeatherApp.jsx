import React, { useState } from 'react';
import './WeatherApp.css'

import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/rain.png';
import search_icon from '../assets/search.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';

const WeatherApp = () => {
    const api_key = `dd94f859a0e52d6e4767fddf735f04a7`;

    const [wicon, setWicon] = useState(cloud_icon);
    const [humidity, setHumidity] = useState('64%');
    const [windSpeed, setWindSpeed] = useState('18 km/h');
    const [temperature, setTemperature] = useState('24°c');
    const [location, setLocation] = useState('London');

    const search = async () => {
        const element = document.getElementsByClassName("cityInput")
        if (element[0].value === '') {
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`

        let response = await fetch(url);
        let data = await response.json();

        setHumidity(data.main.humidity + '%');
        setWindSpeed(Math.floor(data.wind.speed) + ' km/h');
        setTemperature(Math.floor(data.main.temp) + '°c');
        setLocation(data.name);

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
                <input type='text' className='cityInput' placeholder='search' />
                <div className='serach-icon' onClick={() => { search() }}>
                    <img src={search_icon} alt="Search" />
                </div>
            </div>
            <div className='weather-image'>
                <img src={wicon} alt="Weather Icon" />
            </div>
            <div className="weather-temp">{temperature}</div>
            <div className="weather-location">{location}</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} className='icon' alt="Humidity Icon" />
                    <div className="data">
                        <div className="humidity-percent">{humidity}</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} className='icon' alt="Wind Icon" />
                    <div className="data">
                        <div className="wind-rate">{windSpeed}</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherApp;
