import { useEffect } from 'react';

import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
import { getAllProducts } from '../redux/reducers/productsReducer';
import { Product } from '../interfaces/Product';

const Products = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.productsReducer.products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <>
      <h1>Products</h1>
      {products.map((product: Product) => (
        <div key={product.id}>
          <img src={product.images[1]}></img>
          <p>{product.title}</p>
          <p>{product.price}</p>
        </div>
      ))}
    </>
  );
};

export default Products;
