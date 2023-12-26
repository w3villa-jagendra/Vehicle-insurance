import React, { useEffect, useState } from 'react';
import axios from 'axios';


function ApiData(){
    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
      axios
        .get('http://localhost:5113/WeatherForecast')
        .then((response) => {
          let data = response.data;
          setWeatherData(data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });

        
    }, []);


    console.log('he',weatherData)
    return(
        <>
                <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Temperature (°C)</th>
              <th>Summary</th>
              <th>Temperature (°F)</th>
            </tr>
          </thead>
          <tbody>
            {weatherData.map((weather, index) => (
              <tr key={index}>
                <td>{weather.date}</td>
                <td>{weather.temperatureC}</td>
                <td>{weather.summary}</td>
                <td>{weather.temperatureF}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </>
    )
}

export default ApiData;