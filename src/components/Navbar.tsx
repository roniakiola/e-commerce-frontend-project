import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <div className='navbar'>
        <ul className='navbar__menu-left'>
          <li className='navbar__item'>
            <Link to='/' className='navbar__link'>
              Home
            </Link>
          </li>
          <li className='navbar__item'>
            <Link to='/products' className='navbar__link'>
              Products
            </Link>
          </li>
          <li className='navbar__item'>
            <Link to='/profile' className='navbar__link'>
              Profile
            </Link>
          </li>
        </ul>
        <ul className='navbar__menu-right'>
          <li className='navbar__item'>
            <Link to='/cart' className='navbar__link'>
              Cart
            </Link>
          </li>
          <li className='navbar__item'>
            <Link to='/login' className='navbar__link'>
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
