import weatherReducers, { initialState } from './weatherReducers';
import {
  WEATHER_CLEAR,
  WEATHER_HAS_ERRORED,
  WEATHER_IS_LOADING,
  WEATHER_FETCH_DATA_SUCCESS,
  IWeatherState,
  WeatherClearAction,
  WeatherHasErroredAction,
  WeatherIsLoadingAction,
  WeatherFetchDataSuccessAction,
  WeatherActionTypes,
} from './weatherTypes';

describe('weatherReducers', () => {
  it('should return initial state', () => {
    const action: WeatherActionTypes = {
      type: 'random action',
      payload: true,
    };
    expect(weatherReducers(undefined, action)).toEqual(initialState);
  });

  it('should return same state if action not exist', () => {
    const state: IWeatherState = {
      data: {
        city: 'Gotham',
        country: 'US',
        temperature: 23,
        humidity: 33,
        description: 'some description',
        iconUrl: 'url',
      },
      isLoading: true,
      hasErrored: true,
      error: 'some error',
    };
    const action: WeatherActionTypes = {
      type: 'random action',
      payload: true,
    };
    expect(weatherReducers(state, action)).toEqual(state);
  });

  it('should reset state to init state', () => {
    const state: IWeatherState = {
      data: {
        city: 'Gotham',
        country: 'US',
        temperature: 23,
        humidity: 33,
        description: 'some description',
        iconUrl: 'url',
      },
      isLoading: true,
      hasErrored: true,
      error: 'some error',
    };
    const action: WeatherClearAction = {
      type: WEATHER_CLEAR,
      payload: undefined,
    };
    expect(weatherReducers(state, action)).toEqual(initialState);
  });

  it('should set error information in state', () => {
    const state: IWeatherState = {
      data: {
        city: 'Gotham',
        country: 'US',
        temperature: 23,
        humidity: 33,
        description: 'some description',
        iconUrl: 'url',
      },
      isLoading: true,
      hasErrored: false,
      error: '',
    };
    const action: WeatherHasErroredAction = {
      type: WEATHER_HAS_ERRORED,
      payload: {
        hasErrored: true,
        error: 'error info',
      },
    };
    const expectedState: IWeatherState = {
      data: {
        city: 'Gotham',
        country: 'US',
        temperature: 23,
        humidity: 33,
        description: 'some description',
        iconUrl: 'url',
      },
      isLoading: true,
      hasErrored: true,
      error: 'error info',
    };
    expect(weatherReducers(state, action)).toEqual(expectedState);
  });

  it('should set loading status in state', () => {
    const state: IWeatherState = {
      data: {
        city: 'Gotham',
        country: 'US',
        temperature: 23,
        humidity: 33,
        description: 'some description',
        iconUrl: 'url',
      },
      isLoading: true,
      hasErrored: true,
      error: 'some error',
    };
    const action: WeatherIsLoadingAction = {
      type: WEATHER_IS_LOADING,
      payload: false
    };
    const expectedState: IWeatherState = {
      data: {
        city: 'Gotham',
        country: 'US',
        temperature: 23,
        humidity: 33,
        description: 'some description',
        iconUrl: 'url',
      },
      isLoading: false,
      hasErrored: true,
      error: 'some error',
    };
    expect(weatherReducers(state, action)).toEqual(expectedState);
  });

  it('should set loading status in state', () => {
    const state: IWeatherState = {
      data: {
        city: 'Gotham',
        country: 'US',
        temperature: 23,
        humidity: 33,
        description: 'some description',
        iconUrl: 'url',
      },
      isLoading: true,
      hasErrored: true,
      error: 'some error',
    };
    const action: WeatherFetchDataSuccessAction = {
      type: WEATHER_FETCH_DATA_SUCCESS,
      payload: {
        city: 'London',
        country: 'UK',
        temperature: 10,
        humidity: 20,
        description: 'Weather Info',
        iconUrl: 'icon url',
      },
    };
    const expectedState: IWeatherState = {
      data: {
        city: 'London',
        country: 'UK',
        temperature: 10,
        humidity: 20,
        description: 'Weather Info',
        iconUrl: 'icon url',
      },
      isLoading: true,
      hasErrored: true,
      error: 'some error',
    };
    expect(weatherReducers(state, action)).toEqual(expectedState);
  });
});
