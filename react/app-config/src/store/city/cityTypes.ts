import { Action } from 'redux';

// City actions
export const CITY_ADD: string = 'CITY_ADD';
export const CITY_DELETE: string = 'CITY_DELETE';
export const CITY_SET_FILTER: string = 'CITY_SET_FILTER';

//
// State
//

export interface ICity {
  id: number;
  name: string;
};

export interface ICityState {
  readonly cityFilter: string;
  readonly cities: ICity[];
};

//
// Actions
//

// Types of Actions
export interface CityAddAction extends Action<string> {
  payload: string;
};

export interface CityDeleteAction extends Action<string> {
  payload: number;
};

export interface CitySetFilterAction extends Action<string> {
  payload: string;
};

export type CityActionTypes =
  | CityAddAction
  | CityDeleteAction
  | CitySetFilterAction;
