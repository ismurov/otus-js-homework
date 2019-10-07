import React from 'react';
import { connect } from 'react-redux';

import { cityAdd, cityDelete, citySetFilter } from 'actions/cityActions';

import SplitScreen from 'components/SplitScreen';
import CityList from 'components/CityList';

class CityDisplay extends React.Component {
  addCity = () => {
    this.props.onAddCity(this.addCityInput.value);
    this.addCityInput.value = '';
  };
  applyFilter = () => {
    this.props.onSetCityFilter(this.filterInput.value);
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
            <CityList cityList={this.props.cities} removeCityFunction={this.props.onRemoveCity}/>
          </div>
        }
      />
    );
  }
};

const filterCities = (cities, cityFilter) => {
  return cities.filter(city => city.name.toLowerCase().indexOf(cityFilter.toLowerCase()) > -1);
};

const mapStateToProps = state => {
  return {
    cities: filterCities(
      state.city.cities, state.city.cityFilter
    )
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddCity: newCity => dispatch(cityAdd(newCity)),
    onSetCityFilter: cityFilter => dispatch(citySetFilter(cityFilter)),
    onRemoveCity: cityId => dispatch(cityDelete(cityId))
  };
}

const CityDisplayContainer = connect(mapStateToProps, mapDispatchToProps)(CityDisplay);

export default CityDisplayContainer;