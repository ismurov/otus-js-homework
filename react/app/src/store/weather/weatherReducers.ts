import {
  WEATHER_CLEAR,
  WEATHER_HAS_ERRORED,
  WEATHER_IS_LOADING,
  WEATHER_FETCH_DATA_SUCCESS,
  IWeatherInfo,
  IWeatherState,
  WeatherActionTypes,
  WeatherHasErroredAction,
} from './weatherTypes';

export const initialState: IWeatherState = {
  data: {},
  isLoading: false,
  hasErrored: false,
  error: '',
};

const weatherReducers = (state = initialState, action: WeatherActionTypes): IWeatherState => {
  switch (action.type) {
    case WEATHER_CLEAR:
      return initialState;

    case WEATHER_HAS_ERRORED:
      const act = action as WeatherHasErroredAction;
      return {
        ...state,
        hasErrored: act.payload.hasErrored,
        error: act.payload.error,
      };

    case WEATHER_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload as boolean,
      };

    case WEATHER_FETCH_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload as IWeatherInfo,
      };

    default:
      return state;
  }
};

export default weatherReducers;
