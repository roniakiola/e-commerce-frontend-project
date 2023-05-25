import { Link } from 'react-router-dom';
import { DeleteForever } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';

import { ProductCardProps } from '../interfaces/ProductCardProps';
import useAppSelector from '../hooks/useAppSelector';

const ProductCard = (props: ProductCardProps) => {
  const { product, handleDelete, handleUpdate, handleAddToCart } = props;
  const { id, title, price, description, category, images } = product;
  const { user } = useAppSelector((state) => state.userReducer);

  return (
    <>
      <div className='product-card'>
        <div className='product-card__container'>
          {user?.role === 'admin' && (
            <div className='product-card__admin-panel'>
              <DeleteForever
                onClick={() => handleDelete(id)}
                className='delete-icon'
              />
              <EditIcon className='edit-icon' />
            </div>
          )}
          <Link to={String(id)}>
            <div className='product-card__top'>
              <div className='product-card__image-container'>
                <img
                  className='product-card__image'
                  src={images[0]}
                  alt='product'
                />
              </div>
            </div>
            <div className='product-card__middle'>
              <h3 className='product-card__title'>{title}</h3>
              <p className='product-card__description'>"{description}"</p>
            </div>
          </Link>
          <div className='product-card__bottom'>
            <p className='product-card__price'>{price} €</p>
            <button
              onClick={() => handleAddToCart({ product, amount: 1 })}
              className='button--add-to-cart'
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
