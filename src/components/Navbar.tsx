import { Link } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { Badge } from '@mui/material';
import { useState } from 'react';

import useAppSelector from '../hooks/useAppSelector';
import useAppDispatch from '../hooks/useAppDispatch';
import { logoutUser } from '../redux/reducers/userReducer';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { loggedIn } = useAppSelector((state) => state.userReducer);
  const { total } = useAppSelector((state) => state.cartReducer);
  const [navOpen, setNavOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleNavBar = () => {
    setNavOpen(!navOpen);
  };

  return (
    <nav>
      <div className='navbar'>
        <ul className={`navbar__menu-left ${navOpen && 'visible'}`}>
          <li className='navbar__item'>
            <Link
              to='/'
              className='navbar__link'
              onClick={() => handleNavBar()}
            >
              Home
            </Link>
          </li>
          <li className='navbar__item'>
            <Link
              to='/products'
              className='navbar__link'
              onClick={() => handleNavBar()}
            >
              Products
            </Link>
          </li>
          {loggedIn ? (
            <li className='navbar__item'>
              <Link
                to='/profile'
                className='navbar__link'
                onClick={() => handleNavBar()}
              >
                Profile
              </Link>
            </li>
          ) : (
            <></>
          )}
        </ul>
        <ul className='navbar__menu-right'>
          <li className='navbar__item'>
            <Link to='/cart' className='navbar__link'>
              <Badge
                badgeContent={total}
                sx={{
                  '& .MuiBadge-badge': {
                    backgroundColor: '#923232',
                  },
                }}
              >
                <ShoppingCartOutlinedIcon className='navbar__icon' />
              </Badge>
            </Link>
          </li>
          {loggedIn ? (
            <li className='navbar__item'>
              <button className='button-logout' onClick={() => handleLogout()}>
                Logout
              </button>
            </li>
          ) : (
            <li className='navbar__item'>
              <Link to='/login' className='navbar__link'>
                Login
              </Link>
            </li>
          )}
          <li className='navbar__item'>
            <MenuIcon
              onClick={() => handleNavBar()}
              className='navbar__hamburger'
            />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
