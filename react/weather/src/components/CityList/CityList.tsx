import React from 'react';
import { Link } from 'react-router-dom'

import { ICity } from 'store/city/cityTypes';

import './CityList.css';

export interface CityListProps {
  cities: ICity[];
  removeCityFunction: (arg0: number) => void;
};

const CityList = (props: CityListProps) => {
  const { cities=[], removeCityFunction=() => undefined } = props;
  return (
    <div className='CityList'>
      {
        cities.map((city) =>
          <div className='row mb-3' key={city.name}>
            <div className='col'>
              <Link to={ `/city/${city.id}`} className='CityList__link'>
                { city.name }
              </Link>
            </div>
            <div className='col'>
              <button onClick={() => removeCityFunction(city.id)}>delete</button>
            </div>
          </div>
        )
      }
    </div>
  );
};


export default CityList;
