import { RootState, } from './types';

const initialState: RootState = {
  city: {
    cityFilter: '',
    cities: [
      { id: 1, name: 'Moscow' },
      { id: 2, name: 'Saint Petersburg' },
      { id: 3, name: 'London' },
      { id: 4, name: 'Berlin' },
      { id: 5, name: 'Paris' },
      { id: 6, name: 'Barcelona' },
    ]
  },
  weather: {
    data: {},
    isLoading: false,
    hasErrored: false,
    error: '',
  },
};

export default initialState;
