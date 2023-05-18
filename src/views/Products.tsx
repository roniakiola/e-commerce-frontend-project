import { useEffect, useState } from 'react';

import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
import { getAllProducts } from '../redux/reducers/productsReducer';
import { Product } from '../interfaces/Product';
import { Link } from 'react-router-dom';

const Products = () => {
  const { products } = useAppSelector((state) => state.productsReducer);
  const dispatch = useAppDispatch();
  const [currentProducts, setCurrentProducts] = useState<Product[]>(products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    setCurrentProducts(products);
  }, [products]);

  const handleCategory = (category: string) => {
    const sortedProducts = products.filter(
      (product) => product.category.name === category
    );
    setCurrentProducts(sortedProducts);
  };

  return (
    <>
      <h1>Products</h1>
      <button onClick={() => handleCategory('prins')}>Sort by Clothes</button>
      {currentProducts.map((product: Product) => (
        <Link key={product.id} to={String(product.id)}>
          <div>
            <img src={product.images[1]} alt='product'></img>
            <p>{product.title}</p>
            <p>{product.price}</p>
            <h2>{product.category.name}</h2>
          </div>
        </Link>
      ))}
    </>
  );
};

export default Products;
