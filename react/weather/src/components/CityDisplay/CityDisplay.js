import React from 'react';
import { connect } from 'react-redux';

import { weatherClear, weatherFetchData } from 'actions/weatherActions';

import ErrorScreen from 'components/Error';
import SplitScreen from 'components/SplitScreen';
import Weather from 'components/Weather';

class CityDisplay extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        cityName: '',
        cityNotFound: true
      }
    }
  componentDidMount() {
    const cityId = parseInt(this.props.cityId);
    const cities = this.props.cities;
    const city = cities.find(city => city.id === cityId);

    if (city) {
      this.setState({cityNotFound: false, cityName: city.name});
      this.props.getWeather(city.name);
    } else {
      this.setState({cityNotFound : true, cityName: ''});
      this.props.clearWeather();
    }
  }
  render() {
    if (this.state.cityNotFound) {
      return <ErrorScreen msg={'City not found in your favorite list'}/>;
    }
    return (
      <SplitScreen
        screenOne={
          <div className="black-container">
            <Weather />
          </div>
        }
        screenTwo={
          <div className="black-container">
          </div>
        }
      />
    );
  }
};

const mapStateToProps = state => {
  return {
    cities: state.city.cities
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearWeather: () => dispatch(weatherClear()),
    getWeather: query => dispatch(weatherFetchData(query))
  };
}

const CityDisplayContainer = connect(mapStateToProps, mapDispatchToProps)(CityDisplay);

export default CityDisplayContainer;