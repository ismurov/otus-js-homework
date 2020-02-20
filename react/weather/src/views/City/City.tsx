import React from 'react';
import {RouteComponentProps } from 'react-router-dom';

import CityDisplay from 'components/CityDisplay';

interface MatchParams {
    id: string;
}

interface MatchProps extends RouteComponentProps<MatchParams> {
}

const City = ({ match }: MatchProps) => {
  return (
    <CityDisplay cityId={ match.params.id } />
  );
};

export default City;