import { CartItem } from './CartItem';
import { Product } from './Product';
import { UpdatedProduct } from './UpdatedProduct';

export interface ProductCardProps {
  product: Product;
  handleDelete: (id: number) => void;
  handleUpdate: (updatedProduct: UpdatedProduct, id: number) => void;
  handleAddToCart: (cartItem: CartItem) => void;
  handleRemoveFromCart: (cartItem: CartItem) => void;
}
