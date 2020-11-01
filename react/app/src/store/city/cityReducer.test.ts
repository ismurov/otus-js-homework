import cityReducers, { initialState } from './cityReducers';
import {
  CITY_ADD,
  CITY_DELETE,
  CITY_SET_FILTER,
  ICityState,
  CityAddAction,
  CityDeleteAction,
  CitySetFilterAction,
  CityActionTypes,
} from './cityTypes';

describe('cityReducers', () => {
  it('should return initial state', () => {
    const action: CityActionTypes = {
      type: 'random action',
      payload: '',
    };
    expect(cityReducers(undefined, action)).toEqual(initialState);
  });

  it('should return same state if action not exist', () => {
    const state: ICityState = {
      cityFilter: "filter",
      cities: [
        { id: 99, name: 'Gotham' },
      ],
    };
    const action: CityActionTypes = {
      type: 'random action',
      payload: '',
    };
    expect(cityReducers(state, action)).toEqual(state);
  });

  it('should add new city with increment city id', () => {
    const state: ICityState = {
      cityFilter: "filter",
      cities: [
        { id: 99, name: 'Gotham' },
      ],
    };
    const action: CityAddAction = {
      type: CITY_ADD,
      payload: 'Springfield',
    };
    const expectedState: ICityState = {
      cityFilter: "filter",
      cities: [
        { id: 99, name: 'Gotham' },
        { id: 100, name: 'Springfield' },
      ],
    }
    expect(cityReducers(state, action)).toEqual(expectedState);
  });

  it('should return same state if remove the city from the empty list', () => {
    const state: ICityState = {
      cityFilter: "filter",
      cities: [],
    };
    const action: CityDeleteAction = {
      type: CITY_DELETE,
      payload: 99,
    };
    expect(cityReducers(state, action)).toEqual(state);
  });

  it('should delete city by id', () => {
    const state: ICityState = {
      cityFilter: "filter",
      cities: [
        { id: 99, name: 'Gotham' },
        { id: 100, name: 'Springfield' },
        { id: 101, name: 'Gotham' },
      ],
    };
    const action: CityDeleteAction = {
      type: CITY_DELETE,
      payload: 99,
    };
    const expectedState: ICityState = {
      cityFilter: "filter",
      cities: [
        { id: 100, name: 'Springfield' },
        { id: 101, name: 'Gotham' },
      ],
    }
    expect(cityReducers(state, action)).toEqual(expectedState);
  });

  it('should return state with a new city filter', () => {
    const state: ICityState = {
      cityFilter: "filter",
      cities: [
        { id: 99, name: 'Gotham' },
        { id: 100, name: 'Springfield' },
      ],
    };
    const action: CitySetFilterAction = {
      type: CITY_SET_FILTER,
      payload: 'new filter',
    };
    const expectedState: ICityState = {
      cityFilter: 'new filter',
      cities: [
        { id: 99, name: 'Gotham' },
        { id: 100, name: 'Springfield' },
      ],
    }
    expect(cityReducers(state, action)).toEqual(expectedState);
  });
});