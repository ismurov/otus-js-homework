import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Menu, { MenuLink } from 'components/Menu';

import Home from 'views/Home';
import Favorites from 'views/Favorites';
import City from 'views/City';
import Page404 from 'views/404';


const menu: MenuLink[] = [
  {
    title: 'Home',
    link: '/home'
  },
  {
    title: 'Favorite',
    link: '/favorites'
  },
  {
    title: 'City #1',
    link: '/city/1'
  },
  {
    title: '404',
    link: '/page-does-not-exist'
  },

];

const Routes = () => {
  return (
    <div className="wrapper">
      <div className="main container">
        <Menu links={menu}/>
        <Switch>
          <Route exact path='/home' component={Home}/>
          <Route exact path='/'>
            <Redirect to='/home'/>
          </Route>
          <Route exact path='/favorites' component={Favorites}/>
          <Route exact path='/city/:id' component={City}/>
          <Route component={Page404} />
        </Switch>
      </div>
    </div>
  );
};

export default Routes;