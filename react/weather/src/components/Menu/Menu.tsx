import React from 'react';
import { Link } from "react-router-dom";
import './Menu.css'


export interface MenuLink {
  title: string;
  link: string;
};

export interface MenuProps {
  links: MenuLink[];
}

const Menu = ({ links=[] }: MenuProps) => {
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