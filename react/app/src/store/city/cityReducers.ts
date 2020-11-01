import {
  CITY_ADD,
  CITY_DELETE,
  CITY_SET_FILTER,

  CityActionTypes,
  ICityState,
} from './cityTypes';

export const initialState: ICityState = {
  cityFilter: "",
  cities: [],
};

const cityReducers = (state = initialState, action: CityActionTypes): ICityState => {
  switch (action.type) {
    case CITY_ADD:
      return {
        ...state,
        cities: [
          ...state.cities,
          {
            id: state.cities.reduce((maxId, city) => {
              return Math.max(city.id, maxId);
            }, -1) + 1,
            name: action.payload as string,
          },
        ]
      };

    case CITY_DELETE:
      return {
        ...state,
        cities: state.cities.filter(city => city.id !== action.payload),
      };

    case CITY_SET_FILTER:
      return {
        ...state,
        cityFilter: action.payload as string,
      };

    default:
      return state;
  }
};

export default cityReducers;
