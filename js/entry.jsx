import React from 'react';
import ReactDOM from 'react-dom';
import '../css/style.css';
import SubmitForm from './submitForm.jsx';
import UnitSwitch from './unitButton.jsx';
import AppDetails from './AppDetails.jsx';
import DailyForecast from './AppDetails1.jsx';
import SecondForecast from './SecondForecast.jsx'
import ThirdForecast from './ThirdForecast.jsx'
import api from '../api.json';


class WeatherApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    //  url:`http://api.wunderground.com/api/${api.key}/conditions/lang:PL/q/warsaw,pl.json`,
    //  url:`http://api.wunderground.com/api/${api.key}/geolookup/conditions/forecast/q/Poland/Warsaw.json`,
      url:`http://api.wunderground.com/api/${api.key}/geolookup/conditions/forecast/q/Poland/Warsaw.json`,
      inputValue: '',
      unitValue: 'C',
    }
    this.getData = this.getData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.handleClick = this.handleClick.bind(this);
  }
  getData() {
    let url = this.state.url;
    fetch(url).then(function(res) {
     return res.json();
   }).then(function(data) {
     this.setState({
       location: data.current_observation.display_location.full,
       date: data.current_observation.observation_time.substr(16),
       weather: data.current_observation.weather,
       icon: data.current_observation.icon ,
       tempF: Math.round(data.current_observation.temp_f),
       tempC: Math.round(data.current_observation.temp_c),
       humidity: data.current_observation.relative_humidity,
       windMPH: data.current_observation.wind_kph,
       windDegree: data.current_observation.wind_degrees,
       precipitation: data.current_observation.precip_today_metric,
       uv: data.current_observation.UV,
       firstDayforecastTemp: data.forecast.simpleforecast.forecastday[1].high.celsius,
       firstDayforecastCond: data.forecast.simpleforecast.forecastday[1].conditions,
       firstDayforecastIcon: data.forecast.simpleforecast.forecastday[1].icon,
       firstDayforecastTitle: data.forecast.simpleforecast.forecastday[1].date.weekday,
       firstDayforecastDay: data.forecast.simpleforecast.forecastday[1].date.day,
       firstDayforecastMonth: data.forecast.simpleforecast.forecastday[1].date.month,
       firstDayforecastYear: data.forecast.simpleforecast.forecastday[1].date.year,
       secondDayforecastTemp: data.forecast.simpleforecast.forecastday[2].high.celsius,
       secondDayforecastCond: data.forecast.simpleforecast.forecastday[2].conditions,
       secondDayforecastIcon: data.forecast.simpleforecast.forecastday[2].icon,
       secondDayforecastTitle: data.forecast.simpleforecast.forecastday[2].date.weekday,
       secondDayforecastDay: data.forecast.simpleforecast.forecastday[2].date.day,
       secondDayforecastMonth: data.forecast.simpleforecast.forecastday[2].date.month,
       secondDayforecastYear: data.forecast.simpleforecast.forecastday[2].date.year,
       thirdDayforecastTemp: data.forecast.simpleforecast.forecastday[3].high.celsius,
       thirdDayforecastCond: data.forecast.simpleforecast.forecastday[3].conditions,
       thirdDayforecastIcon: data.forecast.simpleforecast.forecastday[3].icon,
       thirdDayforecastTitle: data.forecast.simpleforecast.forecastday[3].date.weekday,
       thirdDayforecastDay: data.forecast.simpleforecast.forecastday[3].date.day,
       thirdDayforecastMonth: data.forecast.simpleforecast.forecastday[3].date.month,
       thirdDayforecastYear: data.forecast.simpleforecast.forecastday[3].date.year,
       errorMsg: '',
     });
   }.bind(this)).catch(function(error) {
     this.setState({
       errorMsg: 'Please, enter a valid city and state, or zip code.'
     });
   }.bind(this));
 }
 componentDidMount() {
    this.getData();
    navigator.geolocation.getCurrentPosition(function(position) {
      this.setState({
        url: `http://api.wunderground.com/api/${api.key}/geolookup/conditions/forecast/q/${position.coords.latitude},${position.coords.longitude}.json'`
      }, () => {
        this.getData();
      });
    }.bind(this));
  }
  handleChange(e) {
    this.setState({
      inputValue: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      url: `http://api.wunderground.com/api/${api.key}/geolookup/conditions/forecast/q/${this.state.inputValue}.json`,
    }, () => {
      this.getData();
    });
  }

  handleClick(e) {
    this.setState({
      unitValue: e.target.id,
    });


  }

  render() {
    return (
        <div>
          <section className="wrapper">
            <div className="container">


            <div className="row">
              <div className="col-1 content">

                <SubmitForm {...this.state.location}
                            change={this.handleChange}
                            submit={this.handleSubmit}
                />
                <div>
                  <p className="text-primary text-center mt-2">{this.state.errorMsg}</p>
                </div>


              </div>
              <div className="col-5 content">

                <AppDetails {...this.state} handleClick={(e) => this.handleClick(e)}/>


                </div>
            </div>

            <div className="row">
              <div className="col-3">
                <div className="row">
                { /*
                  <div className="col-3 temp">
                    {/*<UnitSwitch handleClick={(e) => this.handleClick(e)}/>
                  </div>/*}
                  {/*<div className="col-6">
                    <p>Clear.Chilly</p>
                    <p>dzien tygodnia data godzina</p>
                  </div>
                  */}

                  <div className="col-12">
                    <div className="row">
                      <div className="col-2">
                        <div className="firstDay">
                          <DailyForecast {...this.state }/>
                        </div>
                        <div className="secondDay">
                          <SecondForecast {...this.state }/>
                        </div>
                        <div className="thirdDay">
                          <ThirdForecast {...this.state} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p>Powered by:</p>
                <div className="WUlogo">
                  <a href="https://www.wunderground.com/">
                    <img src="images/wundergroundLogo_4c_rev_horz.png" ></img>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

class App extends React.Component {
  render() {
    return (
      <WeatherApp />
    )
  }
}
document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
});
