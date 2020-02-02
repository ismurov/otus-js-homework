import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk'

import { RootState } from 'store/types';
import { ICity } from 'store/city/cityTypes';

import { weatherClear, weatherFetchData } from 'store/weather/weatherActions';

import ErrorScreen from 'components/Error';
import SplitScreen from 'components/SplitScreen';
import Weather from 'components/Weather';


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
  componentDidMount() {
    const cityId = parseInt(this.props.cityId);
    const cities = this.props.cities;
    const city = cities.find(city => city.id === cityId);

    if (city) {
      this.setState({ cityNotFound: false, cityName: city.name });
      this.props.getWeather(city.name);
    } else {
      this.setState({ cityNotFound: true, cityName: '' });
      this.props.clearWeather();
    }
  }
  render() {
    if (this.state.cityNotFound) {
      return <ErrorScreen msg={'City not found in your favorite list'} />;
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
