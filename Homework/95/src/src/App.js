import './App.css';
import React from 'react';

export default class App extends React.Component {
	componentDidMount() {
		const zip = 55555;
		const key = "<REDACTED>";
		let raw_response;
		fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${key}`)
        .then(resp => {
			raw_response = resp;
			return resp.json()
		})
        .then(weather_data => {
          console.log(weather_data);

          if (!raw_response.ok) {
            throw new Error(`${raw_response.status} ${raw_response.statusText} ${weather_data.message}`);
          }
		  this.setState({weather_data: {
			description: weather_data.weather[0].description,
			icon: weather_data.weather[0].icon,
			name: weather_data.name,
			temperature: weather_data.main.temp
		  }})
        })
        .catch(err => {
			console.log(err);
        });
    }

	render() {
		return (
			<div className="App">
				{
					this.state != null
					&& this.state.weather_data != null
					? (
						<div id="weather_container">
							<img id="weather_icon"
								src={`https://openweathermap.org/img/w/${this.state.weather_data.icon}.png`}
								alt="icon displaying weather type"
							/>
						<div>
							<h1>
								Location: {this.state.weather_data.name}
							</h1>
							<h2 id="weather_temperature">
								Temperature: {this.state.weather_data.temperature}
							</h2>
							<p id="weather_description">
								Description: {this.state.weather_data.description}
							</p>
						</div>
						</div>
					)
					: ""
				}
			</div>
		  );
	}
}
