import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { RootState, RootActionTypes } from 'store/types';
import { weatherClear } from 'store/weather/weatherActions';

import Weather from 'components/Weather';
import GetWeatherForm from 'components/GetWeatherForm';

export interface SearchDisplayProps {
  clearWeather: typeof weatherClear;
};

class SearchDisplay extends React.Component<SearchDisplayProps> {
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

const mapStateToProps = (state: RootState) => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch<RootActionTypes>) => {
  return {
    clearWeather: () => dispatch(weatherClear()),
  };
}

const SearchDisplayContainer = connect(mapStateToProps, mapDispatchToProps)(SearchDisplay);

export default SearchDisplayContainer;