import React from 'react';

import CityDisplay from 'components/CityDisplay';

const City = ({ match }) => {
  return (
    <CityDisplay cityId={ match.params.id } />
  );
};

export default City;