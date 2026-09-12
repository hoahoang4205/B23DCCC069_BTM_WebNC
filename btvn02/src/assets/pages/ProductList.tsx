import { usePagination } from '../../hooks/usePagination';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

// Mock data – thay bằng API thật khi tích hợp backend
const PRODUCTS: Product[] = Array.from({ length: 23 }, (_, i) => ({
  id: `P${String(i + 1).padStart(3, '0')}`,
  name: `Sản phẩm ${i + 1}`,
  price: 10000 + i * 1000,
  stock: 100 - i,
}));

const ITEMS_PER_PAGE = 5;

export default function ProductList() {
  const {
    currentItems,
    currentPage,
    totalPages,
    next,
    prev,
    goToPage,
  } = usePagination<Product>(PRODUCTS, ITEMS_PER_PAGE);

  return (
    <div className="product-list">
      <h2>Danh sách sản phẩm</h2>

      <table>
        <thead>
          <tr>
            <th>Mã</th>
            <th>Tên</th>
            <th>Giá</th>
            <th>Tồn kho</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.price.toLocaleString('vi-VN')}đ</td>
              <td>{p.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={prev} disabled={currentPage === 1}>
          Trước
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            className={page === currentPage ? 'active' : ''}
            onClick={() => goToPage(page)}
          >
            {page}
          </button>
        ))}

        <button onClick={next} disabled={currentPage === totalPages}>
          Sau
        </button>
      </div>

      <p className="pagination-info">
        Trang {currentPage} / {totalPages} — Tổng {PRODUCTS.length} sản phẩm
      </p>
    </div>
  );
}