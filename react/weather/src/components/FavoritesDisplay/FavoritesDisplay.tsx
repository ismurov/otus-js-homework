import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { RootState, RootActionTypes } from 'store/types';
import { ICity } from 'store/city/cityTypes';

import { cityAdd, cityDelete, citySetFilter } from 'store/city/cityActions';

import SplitScreen from 'components/SplitScreen';
import CityList from 'components/CityList';

export interface FavoritesDisplayProps {
  cities: ICity[],
  onAddCity: (arg0: string) => void,
  onSetCityFilter: (arg0: string) => void,
  onRemoveCity: (arg0: number) => void,
};

class FavoritesDisplay extends React.Component<FavoritesDisplayProps> {
  private addCityInput: HTMLInputElement | null;
  private filterInput: HTMLInputElement | null;

  constructor(props: Readonly<FavoritesDisplayProps>) {
    super(props);

    this.addCityInput = null;
    this.filterInput = null;

    this.addCity = this.addCity.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
  }


  private addCity = () => {
    if (this.addCityInput) {
      this.props.onAddCity(this.addCityInput.value);
      this.addCityInput.value = '';
    }
  };
  private applyFilter = () => {
    if (this.filterInput) {
      this.props.onSetCityFilter(this.filterInput.value);
    }
  };
  render() {
    return (
      <SplitScreen
        screenOne={
          <div className="black-container">
            <div>
              <input type="text"
                placeholder="New City..."
                ref={(input) => {this.addCityInput = input}}
              />
              <button onClick={this.addCity}>Add City</button>
            </div>
          </div>
        }
        screenTwo={
          <div className="black-container">
            <div>
              <input
                type="text"
                placeholder="Filter..."
                ref={(input) => {this.filterInput = input}}
                onChange={this.applyFilter}
              />
            </div>
            <CityList cities={this.props.cities} removeCityFunction={this.props.onRemoveCity}/>
          </div>
        }
      />
    );
  }
};

const filterCities = (cities: ICity[], cityFilter: string): ICity[] => {
  return cities.filter(city => city.name.toLowerCase().indexOf(cityFilter.toLowerCase()) > -1);
};

const mapStateToProps = (state: RootState) => {
  return {
    cities: filterCities(
      state.city.cities, state.city.cityFilter,
    ),
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootActionTypes>) => {
  return {
    onAddCity: (newCity: string) => dispatch(cityAdd(newCity)),
    onSetCityFilter: (cityFilter: string) => dispatch(citySetFilter(cityFilter)),
    onRemoveCity: (cityId: number) => dispatch(cityDelete(cityId)),
  };
}

const FavoritesDisplayContainer = connect(mapStateToProps, mapDispatchToProps)(FavoritesDisplay);

export default FavoritesDisplayContainer;