import { useEffect, useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';

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
import { Box, FormControl, InputLabel, MenuItem } from '@mui/material';

const Products = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.productsReducer);
  const { categories } = useAppSelector((state) => state.categoryReducer);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleCategory = async (e: SelectChangeEvent) => {
    const value = e.target.value as string;
    setSelectedCategory(value);
    await dispatch(getFilteredProducts(Number(value)));
    dispatch(sortByPrice(selectedPrice));
  };
  const handlePrice = (e: SelectChangeEvent) => {
    const value = e.target.value as string;
    setSelectedPrice(value);
    dispatch(sortByPrice(value));
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
        <Box sx={{ width: '9em', bgcolor: '#f0f4f9' }}>
          <FormControl fullWidth>
            <InputLabel id='category'>Sort by Category</InputLabel>
            <Select
              labelId='category'
              value={selectedCategory}
              onChange={handleCategory}
            >
              {categories.map((category: Category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ width: '9em', bgcolor: '#f0f4f9' }}>
          <FormControl fullWidth>
            <InputLabel id='price'>Sort by Price</InputLabel>
            <Select
              labelId='price'
              value={selectedPrice}
              onChange={handlePrice}
            >
              <MenuItem value='asc'>Ascending</MenuItem>
              <MenuItem value='desc'>Descending</MenuItem>
            </Select>
          </FormControl>
        </Box>
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
