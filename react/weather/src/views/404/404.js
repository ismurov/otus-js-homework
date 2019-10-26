import React from 'react';
import Error from 'components/Error';


const NoMatch = props => {
  return (
    <Error title={404} msg={'Page Not Found'}/>
  );
};

export default NoMatch;