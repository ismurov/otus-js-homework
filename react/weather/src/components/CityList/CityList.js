import React from 'react';
import { Link } from 'react-router-dom'

import './CityList.css';

const CityList = props => {
  const { cityList=[], removeCityFunction= () => null } = props;
  return (
    <div className='CityList'>
      {
        cityList.map((city) =>
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

