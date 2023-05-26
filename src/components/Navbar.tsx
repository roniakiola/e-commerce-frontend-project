import { Link } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { Badge, Button, Modal } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import useAppSelector from '../hooks/useAppSelector';
import useAppDispatch from '../hooks/useAppDispatch';
import { logoutUser } from '../redux/reducers/userReducer';
import { createProduct } from '../redux/reducers/productsReducer';
import { NewProduct } from '../interfaces/NewProduct';
import useFileUpload from '../hooks/useFileUpload';
import { getAllProducts } from '../redux/reducers/productsReducer';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { loggedIn } = useAppSelector((state) => state.userReducer);
  const { total } = useAppSelector((state) => state.cartReducer);
  const [navOpen, setNavOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit } = useForm<NewProduct>();
  const { fileLocation, handleFileChange } = useFileUpload();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleNavBar = () => {
    setNavOpen(!navOpen);
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const onSubmit = (data: NewProduct) => {
    data.images = [];
    data.images = [...data.images, fileLocation];
    dispatch(createProduct(data));
    dispatch(getAllProducts());
    setIsOpen(false);
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
            <AddCircleOutlineOutlinedIcon
              className='navbar__icon'
              onClick={handleOpenModal}
            />
          </li>
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
                <ShoppingCartOutlinedIcon className='navbar__cart' />
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
            <MenuIcon onClick={() => handleNavBar()} className='navbar__icon' />
          </li>
        </ul>
      </div>
      <Modal
        open={isOpen}
        onClose={handleCloseModal}
        aria-labelledby='create-item-modal-title'
      >
        <div className='modal-container'>
          <h2 id='create-item-modal-title'>Create New Item</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Title</label>
            <input type='text' placeholder='Title' {...register('title')} />
            <label>Price</label>
            <input type='number' placeholder='Price' {...register('price')} />
            <label>Description</label>
            <textarea placeholder='Description' {...register('description')} />
            <label>CategoryID</label>
            <input
              type='number'
              placeholder='CategoryID'
              {...register('categoryId', { min: 1, max: 5 })}
            />
            <label>Upload file</label>
            <input
              type='file'
              multiple
              {...register('images')}
              onChange={(e) => handleFileChange(e.target.files![0])}
            />
            <Button type='submit' variant='contained' color='primary'>
              Create
            </Button>
          </form>
        </div>
      </Modal>
    </nav>
  );
};

export default Navbar;
