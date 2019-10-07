import { combineReducers } from 'redux';
import city from './cityReducers';
import weather from './weatherReducers';

const reducers = combineReducers({
    city,
    weather
});

export default reducers;