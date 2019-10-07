import { WEATHER_CLEAR, WEATHER_HAS_ERRORED, WEATHER_IS_LOADING, WEATHER_FETCH_DATA_SUCCESS } from "constants/ActionTypes";


const API_KEY = 'b1b35bba8b434a28a0be2a3e1071ae5b';

export const weatherClear = () => {
  return {
    type: WEATHER_CLEAR
  };
};

export const weatherHasErrored = (bool, error='') => {
  return {
    type: WEATHER_HAS_ERRORED,
    hasErrored: bool,
    error
  };
};

export const weatherIsLoading = bool => {
  return {
    type: WEATHER_IS_LOADING,
    isLoading: bool
  };
};

export const weatherFetchDataSuccess = data => {
  return {
    type: WEATHER_FETCH_DATA_SUCCESS,
    data
  };
};

const parseData = data => {
  return {
    temperature: data.main.temp,
    city: data.name,
    country: data.sys.country,
    humidity: data.main.humidity,
    description: data.weather[0].description,
    iconUrl: data.weather[0].icon && `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
  }
};

export const weatherFetchData = query => {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric&lang=en";`
  let error = '';
  return dispatch => {
    dispatch(weatherClear());
    dispatch(weatherIsLoading(true));
    fetch(url)
      .then(response => {
        if (!response.ok) {
          error = 'Weather information not found for the city';
          throw Error(response.statusText);
        }

        dispatch(weatherIsLoading(false));

        return response;
      })
      .then(response => response.json())
      .then(data => dispatch(weatherFetchDataSuccess(parseData(data))))
      .catch(() => dispatch(weatherHasErrored(true, error)));
  };
};