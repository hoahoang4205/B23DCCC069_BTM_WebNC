import cartReducer, { addItem, removeItem, updateQuantity } from './cartSlice';
import type { Product } from '../../types';

const productA: Product = {
  id: 'A',
  name: 'Cà phê',
  price: 15000,
  stock: 10,
};

const productB: Product = {
  id: 'B',
  name: 'Bánh mì',
  price: 18000,
  stock: 5,
};

describe('cartSlice - reducer', () => {
  it('addItem: thêm sản phẩm mới với quantity = 1', () => {
    const state = cartReducer(undefined, addItem(productA));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBe('A');
    expect(state.items[0].quantity).toBe(1);
  });

  it('addItem: sản phẩm đã có thì tăng quantity, không tạo dòng mới', () => {
    let state = cartReducer(undefined, addItem(productA));
    state = cartReducer(state, addItem(productA));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
  });

  it('addItem: cập nhật đúng totalQuantity và totalPrice', () => {
    let state = cartReducer(undefined, addItem(productA));
    state = cartReducer(state, addItem(productB));
    expect(state.totalQuantity).toBe(2);
    expect(state.totalPrice).toBe(15000 + 18000);
  });

  it('removeItem: xoá đúng sản phẩm theo id', () => {
    let state = cartReducer(undefined, addItem(productA));
    state = cartReducer(state, addItem(productB));
    state = cartReducer(state, removeItem('A'));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBe('B');
  });

  it('removeItem: id không tồn tại thì state không đổi (edge case)', () => {
    let state = cartReducer(undefined, addItem(productA));
    const snapshot = JSON.parse(JSON.stringify(state));
    state = cartReducer(state, removeItem('NON_EXISTENT'));
    expect(state.items.length).toBe(snapshot.items.length);
  });

  it('updateQuantity: cập nhật đúng số lượng', () => {
    let state = cartReducer(undefined, addItem(productA));
    state = cartReducer(state, updateQuantity({ id: 'A', quantity: 5 }));
    expect(state.items[0].quantity).toBe(5);
  });

  it('updateQuantity: quantity = 0 thì không đổi (edge case)', () => {
    let state = cartReducer(undefined, addItem(productA));
    state = cartReducer(state, updateQuantity({ id: 'A', quantity: 0 }));
    expect(state.items[0].quantity).toBe(1);
  });

  it('updateQuantity: cập nhật đúng tổng tiền sau khi đổi', () => {
    let state = cartReducer(undefined, addItem(productA));
    state = cartReducer(state, updateQuantity({ id: 'A', quantity: 3 }));
    expect(state.totalPrice).toBe(15000 * 3);
  });
});
