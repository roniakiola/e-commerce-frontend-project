import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
import {
  getAllProducts,
  getFilteredProducts,
  deleteProduct,
  sortByPrice,
  updateProduct,
} from '../redux/reducers/productsReducer';
import { addToCart, removeFromCart } from '../redux/reducers/cartReducer';
import { Product } from '../interfaces/Product';
import { UpdatedProduct } from '../interfaces/UpdatedProduct';
import { CartItem } from '../interfaces/CartItem';
import ProductCard from '../components/ProductCard';

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
  const handleUpdate = (updatedProduct: UpdatedProduct, id: number) => {
    dispatch(updateProduct({ updatedProduct, id }));
  };
  const handleDelete = (id: number) => {
    dispatch(deleteProduct(id));
  };
  const handleAddToCart = (cartItem: CartItem) => {
    dispatch(addToCart(cartItem));
  };
  const handleRemoveFromCart = (cartItem: CartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  return (
    <>
      <h1>Products</h1>
      <button onClick={() => handleCategory(1)}>Sort by 1</button>
      <button onClick={() => handlePrice('asc')}>Ascending Price</button>
      <button onClick={() => handlePrice('desc')}>Descending Price</button>
      <div className='product-grid'>
        {products.map((product: Product) => (
          // <div key={product.id}>
          //   <img src={product.images[1]} alt='product'></img>
          //   <Link to={String(product.id)}>
          //     <p>Title: {product.title}</p>
          //     <p>Price: {product.price}</p>
          //     <h2>Category Name: {product.category.name}</h2>
          //   </Link>
          //   <button onClick={() => handleDelete(product.id)}>Delete</button>
          //   <button
          //     onClick={() => handleUpdate({ title: 'updateTest' }, product.id)}
          //   >
          //     Update
          //   </button>
          //   <button onClick={() => handleAddToCart({ product, amount: 1 })}>
          //     Add to Cart
          //   </button>
          //   <button onClick={() => handleRemoveFromCart({ product, amount: 1 })}>
          //     Remove from cart
          //   </button>
          // </div>
          <ProductCard
            key={product.id}
            product={product}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
            handleAddToCart={handleAddToCart}
            handleRemoveFromCart={handleRemoveFromCart}
          />
        ))}
      </div>
    </>
  );
};

export default Products;
