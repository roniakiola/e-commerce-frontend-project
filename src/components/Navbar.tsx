import { Link } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import useAppSelector from '../hooks/useAppSelector';
import useAppDispatch from '../hooks/useAppDispatch';
import { logoutUser } from '../redux/reducers/userReducer';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { loggedIn } = useAppSelector((state) => state.userReducer);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

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
          {loggedIn ? (
            <li className='navbar__item'>
              <Link to='/profile' className='navbar__link'>
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
              <ShoppingCartOutlinedIcon className='navbar__icon' />
            </Link>
          </li>
          {loggedIn ? (
            <li className='navbar__item'>
              <button onClick={() => handleLogout()}>Logout</button>
            </li>
          ) : (
            <li className='navbar__item'>
              <Link to='/login' className='navbar__link'>
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
