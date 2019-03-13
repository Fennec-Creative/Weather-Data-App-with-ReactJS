import React from "react";
import "./App.css";
import Titles from "./titles.js";
import Weather from "./weather.js";
import Form from "./form.js";

class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  };

  kelvinToFarenheit = temp => {
    const newTemp = (9 / 5) * (temp - 273) + 32;
    return newTemp.toFixed(2);
  };

  getWeather = async e => {
    e.preventDefault();
    const city = e.target.elements.city.value;

    const country = e.target.elements.country.value;

    /* const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=london,uk&appid=9b67f797d794305a0d2231d95d5a55c4`
    );*/

    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=9b67f797d794305a0d2231d95d5a55c4`
    );

    const response = await api_call.json();

    if (city && country) {
      this.setState({
        temperature: this.kelvinToFarenheit(response.main.temp),
        city: response.name,
        country: response.sys.country,
        humidity: response.main.humidity,
        description: response.weather[0].description,
        error: ""
      });
    } else {
      this.setState({
        error: "Please enter the values..."
      });
    }

    console.log(response);
  };

  render() {
    return (
      <div className="main_container">
        <div className="top_content">
          <Titles />
          <Form loadWeather={this.getWeather} />
        </div>
        <div className="weather_container">
          <Weather
            temperature={this.state.temperature}
            city={this.state.city}
            country={this.state.country}
            humidity={this.state.humidity}
            description={this.state.description}
            error={this.state.error}
          />
        </div>
      </div>
    );
  }
}
export default App;
