import { useGetProductsQuery } from './productsApi';
import { useAppDispatch } from '../../app/hooks';
import { addItem } from '../cart/cartSlice';
import './ProductList.css';

export default function ProductList() {
  const { data: products, isLoading, isError } = useGetProductsQuery();
  const dispatch = useAppDispatch();

  if (isLoading) return <p className="status">Đang tải sản phẩm...</p>;
  if (isError) return <p className="status error">Lỗi khi tải sản phẩm.</p>;

  return (
    <div className="product-list">
      <h2>Danh sách sản phẩm</h2>
      <ul>
        {products?.map((p) => (
          <li key={p.id} className="product-item">
            <div>
              <span className="product-name">{p.name}</span>
              <span className="product-price">
                {p.price.toLocaleString('vi-VN')}đ
              </span>
            </div>
            <button
              className="btn-add"
              onClick={() => dispatch(addItem(p))}
            >
              Thêm vào giỏ
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
