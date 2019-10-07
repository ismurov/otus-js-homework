import { CITY_ADD, CITY_DELETE, CITY_SET_FILTER } from "constants/ActionTypes";

const initialState = {
  cityFilter: "",
  cities: [
    {id: 1, name: "Moscow"},
    {id: 2, name: "Saint Petersburg"},
    {id: 3, name: "London"},
    {id: 4, name: "Berlin"},
    {id: 5, name: "Paris"},
    {id: 6, name: "Barcelona"},
  ]
};

const cityReducers = (state = initialState, action) => {
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
            name: action.name
          }
        ]
      };

    case CITY_DELETE:
      return {
        ...state,
        cities: state.cities.filter(city => city.id !== action.id)
      };

    case CITY_SET_FILTER:
      return {
        ...state,
        cityFilter: action.filter
      };

    default:
      return state;
  }
};

export default cityReducers;