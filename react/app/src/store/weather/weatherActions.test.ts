import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import {
  weatherClear,
  weatherHasErrored,
  weatherIsLoading,
  weatherFetchDataSuccess,
  weatherFetchData,
} from './weatherActions';
import {
  WEATHER_CLEAR,
  WEATHER_HAS_ERRORED,
  WEATHER_IS_LOADING,
  WEATHER_FETCH_DATA_SUCCESS,

  IWeatherInfo,
  WeatherClearAction,
  WeatherHasErroredAction,
  WeatherIsLoadingAction,
  WeatherFetchDataSuccessAction,
} from './weatherTypes';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('weatherClear action', () => {
  it('should create an action to clear a weather', () => {
    const expectedAction: WeatherClearAction = {
      type: WEATHER_CLEAR,
    };
    expect(weatherClear()).toEqual(expectedAction);
  });
});

describe('weatherHasErrored action', () => {
  it('should create an action to notify about error', () => {
    const hasErrored: boolean = true;
    const error: string = 'some errors';
    const expectedAction: WeatherHasErroredAction = {
      type: WEATHER_HAS_ERRORED,
      payload: {
        hasErrored,
        error,
      }
    };
    expect(weatherHasErrored(hasErrored, error)).toEqual(
      expectedAction
    );
  });
});

describe('weatherIsLoading action', () => {
  it('should create an action to notify about loading', () => {
    const isLoading: boolean = true;
    const expectedAction: WeatherIsLoadingAction = {
      type: WEATHER_IS_LOADING,
      payload: isLoading
    };
    expect(weatherIsLoading(isLoading)).toEqual(expectedAction);
  });
});

describe('weatherFetchDataSuccess action', () => {
  it('should create an action to notify about successful data fetching', () => {
    const data: IWeatherInfo = {
      temperature: 22,
      city: 'London',
      country: 'UK',
      humidity: 70,
      description: 'some description',
      iconUrl: 'url',
    };
    const expectedAction: WeatherFetchDataSuccessAction = {
      type: WEATHER_FETCH_DATA_SUCCESS,
      payload: data,
    };
    expect(weatherFetchDataSuccess(data)).toEqual(expectedAction);
  });
});

describe('weatherFetchData async actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('should have success data fetching', () => {
    const API_KEY: string = process.env.REACT_APP_API_KEY || '';
    const query: string = 'London,UK';
    const url: string = `http://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric&lang=en`;
    const rawBody = `
    {
      "coord":{
        "lon":-0.13,
        "lat":51.51
      },
      "weather":[
        {
          "id":804,
          "main":"Clouds",
          "description":"overcast clouds",
          "icon":"04d"
        }
      ],
      "base":"stations",
      "main":{
        "temp":10.58,
        "feels_like":6.5,
        "temp_min":7.78,
        "temp_max":12.22,
        "pressure":1002,
        "humidity":93
      },
      "visibility":10000,
      "wind":{
        "speed":5.7,
        "deg":250
      },
      "clouds":{
        "all":90
      },
      "dt":1580632504,
      "sys":{
        "type":1,
        "id":1414,
        "country":"GB",
        "sunrise":1580629101,
        "sunset":1580662192
      },
      "timezone":0,
      "id":2643743,
      "name":"London",
      "cod":200
    }`;
    const responseBody = JSON.parse(rawBody);

    const data: IWeatherInfo = {
      temperature: 10.58,
      city: 'London',
      country: 'GB',
      humidity: 93,
      description: 'overcast clouds',
      iconUrl: 'http://openweathermap.org/img/w/04d.png',
    };

    fetchMock.getOnce(url, {
      body: responseBody,
      headers: { 'content-type': 'application/json' }
    })

    const expectedActions = [
      { type: WEATHER_CLEAR },
      { type: WEATHER_IS_LOADING, payload: true },
      { type: WEATHER_IS_LOADING, payload: false },
      { type: WEATHER_FETCH_DATA_SUCCESS, payload: data },
    ]
    const store = mockStore({})
    return store.dispatch(weatherFetchData(query)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  });

  it('should have fail data fetching', () => {
    const API_KEY: string = process.env.REACT_APP_API_KEY || '';
    const query: string = 'London,UK';
    const url: string = `http://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric&lang=en`;

    fetchMock.getOnce(url, 404);

    const expectedActions = [
      { type: WEATHER_CLEAR },
      { type: WEATHER_IS_LOADING, payload: true },
      { type: WEATHER_IS_LOADING, payload: false },
      {
        type: WEATHER_HAS_ERRORED,
        payload: {
          hasErrored: true,
          error: 'Weather information not found for the city',
        },
      },
    ]
    const store = mockStore({})
    return store.dispatch(weatherFetchData(query)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
