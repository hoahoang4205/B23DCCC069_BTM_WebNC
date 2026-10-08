import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../cart/cartSlice';
import { productsApi } from './productsApi';
import ProductList from './ProductList';

const mockProducts = [
  { id: '1', name: 'Cà phê đen', price: 15000, stock: 10 },
  { id: '2', name: 'Bánh mì thịt', price: 18000, stock: 5 },
];

function makeStore() {
  return configureStore({
    reducer: {
      cart: cartReducer,
      [productsApi.reducerPath]: productsApi.reducer,
    },
    middleware: (getDefault) => getDefault().concat(productsApi.middleware),
  });
}

describe('ProductList - async với API mock', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve(
        new Response(JSON.stringify(mockProducts), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }),
      ),
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('hiển thị "Đang tải" khi fetch đang chạy', () => {
    render(
      <Provider store={makeStore()}>
        <ProductList />
      </Provider>,
    );

    expect(screen.getByText(/đang tải/i)).toBeInTheDocument();
  });

  it('hiển thị danh sách khi API trả về thành công', async () => {
    render(
      <Provider store={makeStore()}>
        <ProductList />
      </Provider>,
    );

    await waitFor(
      () => {
        expect(screen.getByText('Cà phê đen')).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });

  it('hiển thị nút "Thêm vào giỏ" cho mỗi sản phẩm', async () => {
    render(
      <Provider store={makeStore()}>
        <ProductList />
      </Provider>,
    );

    await waitFor(
      () => {
        const buttons = screen.getAllByRole('button', {
          name: /thêm vào giỏ/i,
        });
        expect(buttons.length).toBeGreaterThan(0);
      },
      { timeout: 3000 },
    );
  });
});
