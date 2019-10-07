import React from 'react';
import { Link } from "react-router-dom";
import './Menu.css'

const Menu = ({ links=[] }) => {

  return (
    <div className="Menu">
      {
        links.map(( item, index ) => {
          return (
            <Link to={ item.link } key={ index }>
              <button>{ item.title }</button>
            </Link>
          );
        })
      }
    </div>
  );
}

export default Menu;