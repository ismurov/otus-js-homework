import { CITY_ADD, CITY_DELETE, CITY_SET_FILTER } from "constants/ActionTypes";

export const cityAdd = name => {
  return {
    type: CITY_ADD,
    name
  };
};

export const cityDelete = id => {
  return {
    type: CITY_DELETE,
    id
  };
};

export const citySetFilter = filter => {
  return {
    type: CITY_SET_FILTER,
    filter
  };
};
