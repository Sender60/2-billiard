import { CartItem } from '../redux/cart/types';

export const getSumTotalPrice = (items: CartItem[]) => {
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};

export const getCartFromLS = () => {
  const data = localStorage.getItem('cart');
  const items = data ? JSON.parse(data) : [];
  const totalPrice = getSumTotalPrice(items);

  return {
    items: items as CartItem[],
    totalPrice,
  };
};
