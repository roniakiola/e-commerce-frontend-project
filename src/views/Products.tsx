import { useEffect, useState } from 'react';

import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
import {
  getAllProducts,
  getFilteredProducts,
  deleteProduct,
  sortByPrice,
} from '../redux/reducers/productsReducer';
import { Product } from '../interfaces/Product';
import { Link } from 'react-router-dom';

const Products = () => {
  const { products } = useAppSelector((state) => state.productsReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const handleCategory = (categoryId: number) => {
    dispatch(getFilteredProducts(categoryId));
  };
  const handlePrice = (sortOrder: string) => {
    dispatch(sortByPrice(sortOrder));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteProduct(id));
  };

  return (
    <>
      <h1>Products</h1>
      <button onClick={() => handleCategory(1)}>Sort by 1</button>
      <button onClick={() => handlePrice('asc')}>Ascending Price</button>
      <button onClick={() => handlePrice('desc')}>Descending Price</button>
      {products.map((product: Product) => (
        <Link key={product.id} to={String(product.id)}>
          <div>
            <img src={product.images[1]} alt='product'></img>
            <p>{product.title}</p>
            <p>{product.price}</p>
            <h2>{product.category.name}</h2>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </div>
        </Link>
      ))}
    </>
  );
};

export default Products;
