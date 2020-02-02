import { combineReducers } from 'redux';
import city from './city/cityReducers';
import weather from './weather/weatherReducers';


const rootReducer = combineReducers({
  city,
  weather,
});

export default rootReducer;
