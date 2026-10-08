import { useAppSelector } from '../../app/hooks';

export function useCartTotal() {
  const totalQuantity = useAppSelector((state) => state.cart.totalQuantity);
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);

  return { totalQuantity, totalPrice };
}
