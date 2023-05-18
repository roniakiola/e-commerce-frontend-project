import { useEffect, useState } from 'react';

import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
import {
  getAllProducts,
  deleteProduct,
} from '../redux/reducers/productsReducer';
import { Product } from '../interfaces/Product';
import { Link } from 'react-router-dom';

const Products = () => {
  const { products } = useAppSelector((state) => state.productsReducer);
  const dispatch = useAppDispatch();
  const [currentProducts, setCurrentProducts] = useState<Product[]>(products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  //must use because redux state is set in local state currentProducts
  useEffect(() => {
    setCurrentProducts(products);
  }, [products]);

  //handleCategory and handlePrice could be moved to reducer
  //but does it make sense?
  const handleCategory = (category: string) => {
    const sortedByCategory = products.filter(
      (product) => product.category.name === category
    );
    setCurrentProducts(sortedByCategory);
  };
  const handlePrice = (sortOrder: string) => {
    const sortedByPrice = [...currentProducts].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setCurrentProducts(sortedByPrice);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteProduct(id));
  };

  return (
    <>
      <h1>Products</h1>
      <button onClick={() => handleCategory('Clothes')}>Sort by Clothes</button>
      <button onClick={() => handlePrice('asc')}>Ascending Price</button>
      <button onClick={() => handlePrice('desc')}>Descending Price</button>
      {currentProducts.map((product: Product) => (
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
