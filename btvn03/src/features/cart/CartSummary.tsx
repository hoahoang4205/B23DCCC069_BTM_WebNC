import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { removeItem, updateQuantity } from './cartSlice';
import './CartSummary.css';

export default function CartSummary() {
  const { items, totalQuantity, totalPrice } = useAppSelector(
    (state) => state.cart,
  );
  const dispatch = useAppDispatch();

  return (
    <div className="cart-summary">
      <h2>Giỏ hàng ({totalQuantity})</h2>

      {items.length === 0 ? (
        <p className="empty">Giỏ hàng trống</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id} className="cart-item">
              <div className="item-info">
                <span className="item-name">{item.name}</span>
                <span className="item-price">
                  {item.price.toLocaleString('vi-VN')}đ
                </span>
              </div>
              <div className="item-actions">
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    dispatch(
                      updateQuantity({
                        id: item.id,
                        quantity: Number(e.target.value),
                      }),
                    )
                  }
                  className="qty-input"
                />
                <button
                  className="btn-remove"
                  onClick={() => dispatch(removeItem(item.id))}
                >
                  Xoá
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="total">
        Tổng tiền: <strong>{totalPrice.toLocaleString('vi-VN')}đ</strong>
      </div>
    </div>
  );
}
