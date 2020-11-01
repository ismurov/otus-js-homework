import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk'
import {
  // const
  WEATHER_CLEAR,
  WEATHER_HAS_ERRORED,
  WEATHER_IS_LOADING,
  WEATHER_FETCH_DATA_SUCCESS,
  // Data
  IWeatherInfo,
  IWeatherResponse,
  // Actions
  WeatherClearAction,
  WeatherHasErroredAction,
  WeatherIsLoadingAction,
  WeatherFetchDataSuccessAction
} from './weatherTypes';


const API_KEY: string = process.env.REACT_APP_API_KEY || '';


export const weatherClear = (): WeatherClearAction => {
  return {
    type: WEATHER_CLEAR,
  };
};

export const weatherHasErrored = (
  bool: boolean,
  error: string = ''
): WeatherHasErroredAction => {
  return {
    type: WEATHER_HAS_ERRORED,
    payload: {
      hasErrored: bool,
      error
    }
  };
};

export const weatherIsLoading = (bool: boolean): WeatherIsLoadingAction => {
  return {
    type: WEATHER_IS_LOADING,
    payload: bool
  };
};

export const weatherFetchDataSuccess = (
  data: IWeatherInfo
): WeatherFetchDataSuccessAction => {
  return {
    type: WEATHER_FETCH_DATA_SUCCESS,
    payload: data
  };
};

const parseData = (data: IWeatherResponse): IWeatherInfo => {
  return {
    temperature: data.main.temp,
    city: data.name,
    country: data.sys.country,
    humidity: data.main.humidity,
    description: data.weather[0].description,
    iconUrl:
      data.weather[0].icon &&
      `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
  };
};

export const weatherFetchData = (
  query: string
): ThunkAction<any, {}, {}, AnyAction> => async (dispatch) => {
  const url: string = `http://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric&lang=en`;
  let error: string = '';
  
  dispatch(weatherClear());
  dispatch(weatherIsLoading(true));
  return fetch(url)
    .then(response => {
      dispatch(weatherIsLoading(false));
      if (!response.ok) {
        error = 'Weather information not found for the city';
        throw Error(response.statusText);
      }
      return response;
    })
    .then(response => response.json())
    .then((data: IWeatherResponse) => dispatch(weatherFetchDataSuccess(parseData(data))))
    .catch(() => dispatch(weatherHasErrored(true, error)));
};
