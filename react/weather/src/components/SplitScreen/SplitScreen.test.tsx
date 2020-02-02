import React from 'react';
import ReactDOM from 'react-dom';
import SplitScreen from './SplitScreen';

describe('SplitScreen', () => {
  it('renders without crashing (empty)', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SplitScreen />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders without crashing (screenOne)', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SplitScreen screenOne={ <div/> }/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders without crashing (screenTwo)', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SplitScreen screenTwo={ <div/> }/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SplitScreen screenOne={ <div/> } screenTwo={ <div/> } />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
