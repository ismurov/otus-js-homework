import React from 'react';
import Error from 'components/Error';


const NoMatch = () => {
  return (
    <Error title={'404'} msg={'Page Not Found'}/>
  );
};

export default NoMatch;