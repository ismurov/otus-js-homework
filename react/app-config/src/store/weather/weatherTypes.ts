import { Action } from 'redux';

// Weather actions
export const WEATHER_CLEAR: string = 'WEATHER_CLEAR';
export const WEATHER_HAS_ERRORED: string = 'WEATHER_HAS_ERRORED';
export const WEATHER_IS_LOADING: string = 'WEATHER_IS_LOADING';
export const WEATHER_FETCH_DATA_SUCCESS: string = 'WEATHER_FETCH_DATA_SUCCESS';

//
// State
//

export interface IWeatherInfo {
  city?: string;
  country?: string;
  temperature?: number;
  humidity?: number;
  description?: string;
  iconUrl?: string;
};

export interface IWeatherState {
  readonly data: IWeatherInfo;
  readonly isLoading: boolean;
  readonly hasErrored: boolean,
  readonly error: string,
};

//
// Actions
//

// Types of Actions
export interface WeatherClearAction extends Action<string> {
  payload?: undefined;
};

export interface WeatherHasErroredAction extends Action<string> {
  payload: {
    hasErrored: boolean;
    error: string;
  };
};

export interface WeatherIsLoadingAction extends Action<string> {
  payload: boolean;
};

export interface WeatherFetchDataSuccessAction extends Action<string> {
  payload: object;
};

export type WeatherActionTypes =
  | WeatherClearAction
  | WeatherHasErroredAction
  | WeatherIsLoadingAction
  | WeatherFetchDataSuccessAction;

//
// Open Weather API Response
//

export interface IWeatherResponse {
  id: number;
  base: string;
  name: string;
  timezone: number;
  dt: number;
  coord: IWeatherResponseFieldCoord;
  weather: IWeatherResponseFieldWeather[];
  main: IWeatherResponseFieldMain;
  visibility: number;
  wind: IWeatherResponseFieldWind;
  clouds: IWeatherResponseFieldClouds;
  sys: IWeatherResponseFieldSys;
  rain: IWeatherResponseFieldRain;
  cod: number;
};

interface IWeatherResponseFieldCoord {
  lon: number;
  lat: number;
};

interface IWeatherResponseFieldWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
};

interface IWeatherResponseFieldMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
};

interface IWeatherResponseFieldWind {
  speed: number;
};

interface IWeatherResponseFieldClouds {
  all: number;
};

interface IWeatherResponseFieldSys {
  id: number;
  type: number;
  country: string;
  sunrise: number;
  sunset: number;
};

interface IWeatherResponseFieldRain {
  ['1h']: number;
};
