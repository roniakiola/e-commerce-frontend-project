import { useEffect, useState } from 'react';

import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
import {
  getAllProducts,
  getFilteredProducts,
} from '../redux/reducers/productsReducer';
import { Product } from '../interfaces/Product';
import { Link } from 'react-router-dom';

const Products = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.productsReducer.products);
  const filteredProducts = useAppSelector(
    (state) => state.productsReducer.filteredProducts
  );
  const [currentProducts, setCurrentProducts] = useState<Product[]>([]);

  useEffect(() => {
    dispatch(getAllProducts());
    setCurrentProducts(products);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCategory = (category: number) => {
    dispatch(getFilteredProducts(category));
    setCurrentProducts(filteredProducts);
  };

  return (
    <>
      <h1>Products</h1>
      <button onClick={() => handleCategory(1)}>Sort by Clothes</button>
      {currentProducts.map((product: Product) => (
        <Link key={product.id} to={String(product.id)}>
          <div>
            <img src={product.images[1]} alt='product'></img>
            <p>{product.title}</p>
            <p>{product.price}</p>
          </div>
        </Link>
      ))}
    </>
  );
};

export default Products;
