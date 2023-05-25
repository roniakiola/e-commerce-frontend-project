import { useEffect } from 'react';

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
import { Category } from '../interfaces/Category';
import { getAllCategories } from '../redux/reducers/categoryReducer';

const Products = () => {
  const { products } = useAppSelector((state) => state.productsReducer);
  const { categories } = useAppSelector((state) => state.categoryReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCategories());
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
      <div className='filter-container'>
        <div className='filter-container__categories'>
          {categories.map((category: Category) => (
            <button onClick={() => handleCategory(category.id)}>
              Sort by {category.name}
            </button>
          ))}
        </div>
        <div className='filter-container__prices'>
          <button onClick={() => handlePrice('asc')}>Ascending Price</button>
          <button onClick={() => handlePrice('desc')}>Descending Price</button>
        </div>
      </div>
      <div className='product-grid'>
        {products.map((product: Product) => (
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
