import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

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
      <h1>SingleProduct</h1>
      {currentProduct ? (
        <div>
          <h2>{currentProduct.title}</h2>
          <p>{currentProduct.price}</p>
        </div>
      ) : (
        <h1>Product not found</h1>
      )}
    </>
  );
};

export default SingleProduct;
