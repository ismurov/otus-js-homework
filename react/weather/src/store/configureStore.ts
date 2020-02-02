import { createStore, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { RootState } from './types';


const configureStore = (initialState?: RootState | undefined): Store => {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  );
};

export default configureStore;