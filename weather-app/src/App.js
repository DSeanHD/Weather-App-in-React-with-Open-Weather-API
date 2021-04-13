import React from 'react';
import './App.css';

const api = {
  key: '878a57749cc4f5a8994ef8f7c60a8448',
  base: 'https://api.openweathermap.org/data/2.5/'
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: '',
      city: ''
    };
  }
  
  search = evt => {
    if (evt.which === 13) {
      let url = `${api.base}weather?q=${this.state.city}&units=metric&appid=${api.key}`;
      fetch(url)
        .then(res => res.json())
        .then(result => {
          this.setState({weather: result});
          this.setState({city: ''});
          console.log(result);
        });
    }
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Weather App!</h1>
        </header>

        <div className="weather">
          <div>
            <input 
              type="text"
              placeholder="Search..." 
              id="search"
              onChange={e => this.setState({city: e.target.value})}
              value={this.state.city}
              onKeyPress={this.search}
            />
            {(typeof this.state.weather.main != "undefined") ? (
              <div className="Search">
                <div id="city">{this.state.weather.name}, {this.state.weather.sys.country}</div>
                <div id="temperature">{Math.round(this.state.weather.main.temp)}c</div>
                <div id="forecast">{this.state.weather.weather[0].description}</div>
              </div>
            ) : ('')}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
