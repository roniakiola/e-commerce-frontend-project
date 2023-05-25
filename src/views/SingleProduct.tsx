import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import Carousel from 'react-material-ui-carousel';

import { Product } from '../interfaces/Product';

const SingleProduct = () => {
  const { id } = useParams();
  const [currentProduct, setCurrentProduct] = useState<Product>();

  //Make into custom hook or implement into reducer?
  const getSingleProduct = async () => {
    try {
      const response = await axios.get(
        `https://api.escuelajs.co/api/v1/products/${id}`
      );
      setCurrentProduct(response.data);
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  };

  useEffect(() => {
    getSingleProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {currentProduct ? (
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
                {currentProduct.images.map((image, index) => (
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
              <h2 className='single-product__title'>{currentProduct.title}</h2>
              <p className='single-product__description'>
                "{currentProduct.description}"
              </p>
              <p className='single-product__price'>{currentProduct.price} €</p>
              <button className='button--add-to-cart'>Add to Cart</button>
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
