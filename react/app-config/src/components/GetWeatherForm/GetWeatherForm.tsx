import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk'

import { RootState } from 'store/types';

import { weatherHasErrored, weatherFetchData } from 'store/weather/weatherActions';

export interface GetWeatherFormProps {
  fetchWeatherData: (arg0: string) => void;
  clearWeatherError: () => void;
  showWeatherError: (arg0: string) => void;
};

export interface GetWeatherFormState {
  city: string;
  country: string;
};

class GetWeatherForm extends React.Component<GetWeatherFormProps, GetWeatherFormState> {

  constructor(props: Readonly<GetWeatherFormProps>) {
    super(props);
    this.state = {
      city: '',
      country: '',
    };
    this.getWeather = this.getWeather.bind(this);
  }
  private getWeather(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { city, country } = this.state;
    if (city) {
      this.props.clearWeatherError();
      const query = `${city}${country ? `,${country}` : ''}`;
      this.props.fetchWeatherData(query);
    } else {
      this.props.showWeatherError('Please enter a city name.');
    }
  }
  render() {
    return (
      <form onSubmit={this.getWeather}>
        <input
          name="city"
          type="text"
          placeholder="City..."
          onChange={(e) => this.setState({ city: e.target.value})}
        />
        <input
          name="country"
          type="text"
          placeholder="Country..."
          onChange={(e) => this.setState({ country: e.target.value})}
        />
        <button>Get Weather</button>
      </form>
    );
  }
};

const mapStateToProps = (state: RootState) => {
  return {};
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => {
  return {
    fetchWeatherData: (query: string) => dispatch(weatherFetchData(query)),
    clearWeatherError: () => dispatch(weatherHasErrored(false, '')),
    showWeatherError: (error: string) => dispatch(weatherHasErrored(true, error)),
  };
}

const GetWeatherFormContainer = connect(mapStateToProps, mapDispatchToProps)(GetWeatherForm);

export default GetWeatherFormContainer;
