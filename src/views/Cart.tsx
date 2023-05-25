import { useEffect, useState } from 'react';

import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
import { CartItem } from '../interfaces/CartItem';
import { addToCart, removeFromCart } from '../redux/reducers/cartReducer';

const Cart = () => {
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector((state) => state.cartReducer);
  const [totalPrice, setTotalPrice] = useState<number>();

  const handleAddToCart = (cartItem: CartItem) => {
    dispatch(addToCart(cartItem));
  };
  const handleRemoveFromCart = (cartItem: CartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  const calcTotalPrice = () => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.product.price * item.amount,
      0
    );
    setTotalPrice(total);
  };

  useEffect(() => {
    calcTotalPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]); 

  return (
    <>
      <div className='cart-container'>
        {cartItems.map((item: CartItem) => (
          <div className='cart-item'>
            <div className='cart-item__image-container'>
              <img
                className='cart-item__image'
                src={item.product.images[0]}
                alt='product'
              />
            </div>
            <div className='cart-item__content-container'>
              <h2>{item.product.title}</h2>
              <h2>{item.product.price} €</h2>
            </div>
            <div className='cart-item__button-container'>
              <button
                onClick={() =>
                  handleRemoveFromCart({ product: item.product, amount: 1 })
                }
              >
                -
              </button>
              <p className='cart-item__amount'>{item.amount}</p>
              <button
                onClick={() =>
                  handleAddToCart({ product: item.product, amount: 1 })
                }
              >
                +
              </button>
            </div>
          </div>
        ))}
        <h2 className='total-price'>Total Price: {totalPrice} €</h2>
      </div>
    </>
  );
};

export default Cart;
