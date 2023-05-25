import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import Carousel from 'react-material-ui-carousel';

import { CartItem } from '../interfaces/CartItem';
import { Product } from '../interfaces/Product';
import useAppDispatch from '../hooks/useAppDispatch';
import { addToCart } from '../redux/reducers/cartReducer';

const SingleProduct = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    getSingleProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSingleProduct = async () => {
    try {
      const response = await axios.get(
        `https://api.escuelajs.co/api/v1/products/${id}`
      );
      setProduct(response.data);
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  };

  const handleAddToCart = (cartItem: CartItem) => {
    dispatch(addToCart(cartItem));
  };

  return (
    <>
      {product ? (
        <div className='single-product'>
          <div className='single-product__container'>
            <div className='single-product__carousel-container'>
              <Carousel
                autoPlay={false}
                animation='slide'
                swipe={true}
                navButtonsAlwaysVisible
                indicatorContainerProps={{
                  style: {
                    zIndex: 2,
                    marginTop: '-23px',
                    position: 'relative',
                  },
                }}
              >
                {product.images.map((image, index) => (
                  <div key={index} className='single-product__image-container'>
                    <img
                      className='single-product__image'
                      src={image}
                      alt='product'
                    />
                  </div>
                ))}
              </Carousel>
            </div>
            <div className='single-product__content-container'>
              <h2 className='single-product__title'>{product.title}</h2>
              <p className='single-product__description'>
                "{product.description}"
              </p>
              <p className='single-product__price'>{product.price} €</p>
              <button
                onClick={() => handleAddToCart({ product, amount: 1 })}
                className='button--add-to-cart'
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};

export default SingleProduct;
