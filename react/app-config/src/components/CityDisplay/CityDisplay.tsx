import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk'

import { RootState } from 'store/types';
import { ICity } from 'store/city/cityTypes';

import { weatherClear, weatherFetchData } from 'store/weather/weatherActions';

export interface CityDisplayProps {
  cityId: string;
  cities: ICity[];
  clearWeather: () => void;
  getWeather: (arg0: string) => void;
};

export interface CityDisplayState {
  cityName: string;
  cityNotFound: boolean;
};


class CityDisplay extends React.Component<CityDisplayProps, CityDisplayState> {

  constructor(props: Readonly<CityDisplayProps>) {
    super(props);
    this.state = {
      cityName: '',
      cityNotFound: true
    }
  }
  render() {
    return <div>CityDisplay</div>;
  }
};

const mapStateToProps = (state: RootState) => {
  return {
    cities: state.city.cities
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => {
  return {
    clearWeather: () => dispatch(weatherClear()),
    getWeather: (query: string) => dispatch(weatherFetchData(query)),
  };
}

const CityDisplayContainer = connect(mapStateToProps, mapDispatchToProps)(CityDisplay);

export default CityDisplayContainer;
