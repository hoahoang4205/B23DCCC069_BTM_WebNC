import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { addItem } from './cartSlice';
import CartSummary from './CartSummary';
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

describe('CartSummary', () => {
  it('hiển thị "Giỏ hàng trống" khi chưa có sản phẩm', () => {
    render(
      <Provider store={makeStore()}>
        <CartSummary />
      </Provider>,
    );
    expect(screen.getByText(/giỏ hàng trống/i)).toBeInTheDocument();
  });

  it('hiển thị đúng tên sản phẩm trong giỏ', () => {
    const preloaded = cartReducer(undefined, addItem(productA));
    render(
      <Provider store={makeStore(preloaded)}>
        <CartSummary />
      </Provider>,
    );
    expect(screen.getByText('Cà phê')).toBeInTheDocument();
  });

  it('click nút "Xoá" thì sản phẩm bị xoá khỏi giỏ', async () => {
    const preloaded = cartReducer(undefined, addItem(productA));
    const store = makeStore(preloaded);
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <CartSummary />
      </Provider>,
    );

    await user.click(screen.getByRole('button', { name: /xoá/i }));

    expect(store.getState().cart.items).toHaveLength(0);
  });

  it('thay đổi số lượng qua input thì tổng tiền cập nhật', async () => {
    const preloaded = cartReducer(undefined, addItem(productA));
    const store = makeStore(preloaded);

    render(
      <Provider store={store}>
        <CartSummary />
      </Provider>,
    );

    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '5' } });

    expect(store.getState().cart.items[0].quantity).toBe(5);
    expect(store.getState().cart.totalPrice).toBe(15000 * 5);
  });
});
