import React from 'react';

import SplitScreen from 'components/SplitScreen';
import Titles from 'components/Title';
import SearchDisplay from 'components/SearchDisplay';

const Home = props => {
  return (
    <SplitScreen
        screenOne={ <Titles /> }
        screenTwo={ <SearchDisplay /> }
    />
  );
};

export default Home;