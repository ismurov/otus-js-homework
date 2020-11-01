import {
  CITY_ADD,
  CITY_DELETE,
  CITY_SET_FILTER,

  CityAddAction,
  CityDeleteAction,
  CitySetFilterAction,
} from './cityTypes';

export const cityAdd = (name: string): CityAddAction => {
  return {
    type: CITY_ADD,
    payload: name,
  };
};

export const cityDelete = (id: number): CityDeleteAction => {
  return {
    type: CITY_DELETE,
    payload: id,
  };
};

export const citySetFilter = (filter: string): CitySetFilterAction => {
  return {
    type: CITY_SET_FILTER,
    payload: filter,
  };
};
