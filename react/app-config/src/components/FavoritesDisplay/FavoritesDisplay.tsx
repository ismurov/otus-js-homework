import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { RootState, RootActionTypes } from 'store/types';
import { ICity } from 'store/city/cityTypes';

import { cityAdd, cityDelete, citySetFilter } from 'store/city/cityActions';

export interface FavoritesDisplayProps {
  cities: ICity[];
  onAddCity: (arg0: string) => void;
  onSetCityFilter: (arg0: string) => void;
  onRemoveCity: (arg0: number) => void;
}

class FavoritesDisplay extends React.Component<FavoritesDisplayProps> {
  private addCityInput: HTMLInputElement | null;
  private filterInput: HTMLInputElement | null;

  constructor(props: Readonly<FavoritesDisplayProps>) {
    super(props);

    this.addCityInput = null;
    this.filterInput = null;
  }


  render() {
    return <div>FavoritesDisplay</div>;
  }
}

const filterCities = (cities: ICity[], cityFilter: string): ICity[] => {
  return cities.filter(
    city => city.name.toLowerCase().indexOf(cityFilter.toLowerCase()) > -1
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    cities: filterCities(state.city.cities, state.city.cityFilter)
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootActionTypes>) => {
  return {
    onAddCity: (newCity: string) => dispatch(cityAdd(newCity)),
    onSetCityFilter: (cityFilter: string) =>
      dispatch(citySetFilter(cityFilter)),
    onRemoveCity: (cityId: number) => dispatch(cityDelete(cityId))
  };
};

const FavoritesDisplayContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoritesDisplay);

export default FavoritesDisplayContainer;
