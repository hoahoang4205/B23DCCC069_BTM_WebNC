import { renderHook } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import cartReducer, { addItem } from './cartSlice';
import { useCartTotal } from './useCartTotal';
import type { Product } from '../../types';

const productA: Product = {
  id: 'A',
  name: 'Cà phê',
  price: 15000,
  stock: 10,
};

function makeStore(preloaded?: ReturnType<typeof cartReducer>) {
  return configureStore({
    reducer: { cart: cartReducer },
    preloadedState: preloaded ? { cart: preloaded } : undefined,
  });
}

describe('useCartTotal', () => {
  it('trả về 0 khi giỏ hàng rỗng', () => {
    const store = makeStore();
    const { result } = renderHook(() => useCartTotal(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current.totalQuantity).toBe(0);
    expect(result.current.totalPrice).toBe(0);
  });

  it('trả về đúng tổng khi có sản phẩm trong giỏ', () => {
    const preloaded = cartReducer(undefined, addItem(productA));
    const store = makeStore(preloaded);
    const { result } = renderHook(() => useCartTotal(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current.totalQuantity).toBe(1);
    expect(result.current.totalPrice).toBe(15000);
  });
});
