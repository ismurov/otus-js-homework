import React from 'react';
import { connect } from 'react-redux';

import { weatherFetchData, weatherHasErrored } from 'actions/weatherActions';


class GetWeatherForm extends React.Component {
  constructor(props) {
    super(props);
    this.getWeather = this.getWeather.bind(this);
  }
  getWeather(event) {
    event.preventDefault();
    const city = event.target.elements.city.value;
    const country = event.target.elements.country.value;
    if (city) {
      const query = `${city}${country ? `,${country}` : ''}`;
      this.props.fetchWeatherData(query);
    } else {
      this.props.showWeatherError('Please enter a city name.');
    }
  }
  render(){
    return (
      <form onSubmit={this.getWeather}>
        <input type="text" name="city" placeholder="City..." />
        <input type="text" name="country" placeholder="Country..." />
        <button>Get Weather</button>
      </form>
    );
  }
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    fetchWeatherData: query => dispatch(weatherFetchData(query)),
    showWeatherError: error => dispatch(weatherHasErrored(true, error))
  };
}

const GetWeatherFormContainer = connect(mapStateToProps, mapDispatchToProps)(GetWeatherForm);

export default GetWeatherFormContainer;