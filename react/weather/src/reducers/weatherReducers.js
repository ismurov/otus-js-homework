import {
  WEATHER_CLEAR,
  WEATHER_HAS_ERRORED,
  WEATHER_IS_LOADING,
  WEATHER_FETCH_DATA_SUCCESS
} from 'constants/ActionTypes';


const initialState = {
  data: {},
  isLoading: false,
  hasErrored: false,
  error: ''
};

const weatherReducers = (state = initialState, action) => {
  switch (action.type) {
    case WEATHER_CLEAR:
      return initialState;

    case WEATHER_HAS_ERRORED:
      return {
        ...state,
        hasErrored: action.hasErrored,
        error: action.error
      };

    case WEATHER_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };

    case WEATHER_FETCH_DATA_SUCCESS:
      return {
        ...state,
        data: action.data
      };

    default:
      return state;
  }
};

export default weatherReducers;