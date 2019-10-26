import React from 'react';
import { connect } from 'react-redux';

import { weatherClear } from 'actions/weatherActions';

import Weather from 'components/Weather';
import GetWeatherForm from 'components/GetWeatherForm';

class SearchDisplay extends React.Component {
  componentDidMount() {
    this.props.clearWeather();
  }
  render() {
    return (
      <div className="black-container">
        <GetWeatherForm />
        <Weather />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    clearWeather: () => dispatch(weatherClear()),
  };
}

const SearchDisplayContainer = connect(mapStateToProps, mapDispatchToProps)(SearchDisplay);

export default SearchDisplayContainer;