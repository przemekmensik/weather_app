import React from 'react';
import ReactDOM from 'react-dom';
import '../css/style.css';
import SubmitForm from './submitForm.jsx';
import UnitSwitch from './unitButton.jsx';
import AppDetails from './AppDetails.jsx'
import api from '../api.json';


class WeatherApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url:`http://api.wunderground.com/api/${api.key}/conditions/q/warsaw,pl.json`,
      inputValue: '',
      unitValue: 'C',
    }
    this.getData = this.getData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
       icon: data.current_observation.icon_url,
       tempF: Math.round(data.current_observation.temp_f),
       tempC: Math.round(data.current_observation.temp_c),
       humidity: data.current_observation.relative_humidity,
       windMPH: data.current_observation.wind_kph,
       windDegree: data.current_observation.wind_degrees,
       precipitation: data.current_observation.precip_today_metric,
       uv: data.current_observation.UV,
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
        url: `http://api.wunderground.com/api/${api.key}/conditions/q/${position.coords.latitude},${position.coords.longitude}.json'`
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
      url: `http://api.wunderground.com/api/${api.key}/conditions/q/${this.state.inputValue}.json`,
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



            <div className="row">
              <div className="col-1 content">
                <SubmitForm {...this.state.location}
                            change={this.handleChange}
                            submit={this.handleSubmit}
                />
                <p className="text-primary text-center mt-2">{this.state.errorMsg}</p>

              </div>
              <div className="col-5 content" id="header">
                <AppDetails {...this.state}/>
                </div>
            </div>

            <div className="row">
              <div className="col-3">
                <div className="row">
                  <div className="col-3 temp">

                      <p>3C</p>
                      <div className="verticalLine"></div>
                      <UnitSwitch handleClick={this.handleClick}/>


                  </div>
                  <div className="col-6">
                    <p>Clear.Chilly</p>
                    <p>dzien tygodnia data godzina</p>
                  </div>
                  <div className="col-12">
                    <div className="row">
                      <div className="col-2">
                        <div className="firstDay">
                          <p>Tuesday</p>
                          <div>
                            <img id="sun3" src="images/sun.png"></img>
                          </div>
                          <p>4C 41F</p>
                        </div>
                        <div className="secondDay">
                          <p>Wednesday</p>
                          <div>
                            <img id="sun3" src="images/sun.png"></img>
                          </div>
                          <p>4C 41F</p>
                        </div>
                        <div className="thirdDay">
                          <p>Thursday</p>
                          <div>
                            <img id="sun3" src="images/sun.png"></img>
                          </div>
                          <p>4C 41F</p>
                        </div>
                      </div>
                    </div>
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
