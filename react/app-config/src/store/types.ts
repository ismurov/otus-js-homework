import { $CombinedState } from 'redux';
import { ICityState, CityActionTypes } from './city/cityTypes';
import { IWeatherState, WeatherActionTypes } from './weather/weatherTypes';


export type RootState = {
    readonly [$CombinedState]?: undefined;
} & {
    readonly city: ICityState;
    readonly weather: IWeatherState;
}

export type RootActionTypes =
    | CityActionTypes
    | WeatherActionTypes;
