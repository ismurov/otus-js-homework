import {
  cityAdd,
  cityDelete,
  citySetFilter,
} from './cityActions';
import {
  CITY_ADD,
  CITY_DELETE,
  CITY_SET_FILTER,

  CityAddAction,
  CityDeleteAction,
  CitySetFilterAction,
} from './cityTypes';

describe('cityAdd action', () => {
  it('should create an action to add a city', () => {
    const name: string = 'London';
    const expectedAction: CityAddAction = {
      type: CITY_ADD,
      payload: name,
    };
    expect(cityAdd(name)).toEqual(expectedAction);
  });
});

describe('cityDelete action', () => {
  it('should create an action to delete a city', () => {
    const id: number = 101;
    const expectedAction: CityDeleteAction = {
      type: CITY_DELETE,
      payload: id,
    };
    expect(cityDelete(id)).toEqual(expectedAction);
  });
});

describe('citySetFilter action', () => {
  it('should create an action to apply a filter to cities', () => {
    const filter: string = 'London';
    const expectedAction: CitySetFilterAction = {
      type: CITY_SET_FILTER,
      payload: filter,
    };
    expect(citySetFilter(filter)).toEqual(expectedAction);
  });
});
