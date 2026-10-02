import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { FixedSizeList, type ListChildComponentProps } from 'react-window';
import type { SortBy } from '../types';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import SearchBar from '../components/SearchBar';
import SortSelect from '../components/SortSelect';
import ProductCard from '../components/ProductCard';
import { useDebounce } from '../hooks/useDebounce';

const ITEM_HEIGHT = 88;

export default function ProductListPage() {
  const [keyword, setKeyword] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>('name-asc');
  const [cart, setCart] = useState<Record<string, number>>({});
  const [isCartOpen, setIsCartOpen] = useState(false);

  const debouncedKeyword = useDebounce(keyword, 300);

  const filtered = useMemo(() => {
    const kw = debouncedKeyword.toLowerCase();
    return MOCK_PRODUCTS.filter((product) => {
      const remaining = product.stock - (cart[product.id] ?? 0);
      return remaining > 0 && (!kw || product.name.toLowerCase().includes(kw));
    }).map((product) => ({
      ...product,
      stock: product.stock - (cart[product.id] ?? 0),
    }));
  }, [debouncedKeyword, cart]);

  const sorted = useMemo(() => {
    const copy = [...filtered];
    switch (sortBy) {
      case 'name-asc':  return copy.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc': return copy.sort((a, b) => b.name.localeCompare(a.name));
      case 'price-asc': return copy.sort((a, b) => a.price - b.price);
      case 'price-desc':return copy.sort((a, b) => b.price - a.price);
      default:          return copy;
    }
  }, [filtered, sortBy]);

  const handleAddToCart = useCallback((id: string) => {
    setCart((previous) => {
      const product = MOCK_PRODUCTS.find((item) => item.id === id);
      const quantity = previous[id] ?? 0;
      if (!product || quantity >= product.stock) return previous;
      return { ...previous, [id]: quantity + 1 };
    });
  }, []);

  const handleRemoveFromCart = useCallback((id: string) => {
    setCart((previous) => {
      const quantity = previous[id] ?? 0;
      if (quantity <= 1) {
        const next = { ...previous };
        delete next[id];
        return next;
      }
      return { ...previous, [id]: quantity - 1 };
    });
  }, []);

  const cartCount = Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  const cartItems = MOCK_PRODUCTS.filter((product) => cart[product.id] > 0).map((product) => ({
    ...product,
    quantity: cart[product.id],
  }));
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const listRef = useRef<FixedSizeList>(null);

  useEffect(() => {
    listRef.current?.scrollTo(0);
  }, [debouncedKeyword, sortBy]);

  const Row = useCallback(
    ({ index, style }: ListChildComponentProps) => (
      <div className="product-row" style={style}>
        <ProductCard
          product={sorted[index]}
          onAddToCart={handleAddToCart}
        />
      </div>
    ),
    [sorted, handleAddToCart]
  );

  return (
    <div className="product-page">
      <header className="page-header">
        <h1>📦 Quản lý sản phẩm</h1>
        <div className="stats">
          <span>Tổng: {MOCK_PRODUCTS.length.toLocaleString('vi-VN')}</span>
          <span>Hiển thị: {sorted.length.toLocaleString('vi-VN')}</span>
          <button
            className="cart-toggle"
            type="button"
            aria-expanded={isCartOpen}
            onClick={() => setIsCartOpen((isOpen) => !isOpen)}
          >
            Giỏ hàng ({cartCount})
          </button>
        </div>
      </header>

      {isCartOpen && (
        <section className="cart-panel" aria-label="Sản phẩm trong giỏ hàng">
          <div className="cart-panel-header">
            <h2>Giỏ hàng</h2>
            <span>{cartCount} sản phẩm</span>
          </div>

          {cartItems.length === 0 ? (
            <p className="cart-empty">Giỏ hàng đang trống.</p>
          ) : (
            <>
              <ul className="cart-items">
                {cartItems.map((item) => (
                  <li className="cart-item" key={item.id}>
                    <span className="cart-item-icon" aria-hidden="true">{item.icon}</span>
                    <div className="cart-item-info">
                      <strong>{item.name}</strong>
                      <span>
                        {item.quantity} × {item.price.toLocaleString('vi-VN')}đ
                      </span>
                    </div>
                    <strong className="cart-item-total">
                      {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                    </strong>
                    <button
                      className="cart-remove"
                      type="button"
                      aria-label={`Bỏ một ${item.name} khỏi giỏ`}
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      −
                    </button>
                  </li>
                ))}
              </ul>
              <div className="cart-total">
                <span>Tổng cộng</span>
                <strong>{cartTotal.toLocaleString('vi-VN')}đ</strong>
              </div>
            </>
          )}
        </section>
      )}

      <div className="toolbar">
        <SearchBar keyword={keyword} onChange={setKeyword} />
        <SortSelect value={sortBy} onChange={setSortBy} />
      </div>

      {sorted.length === 0 ? (
        <div className="empty-state">
          <p>💔 Không tìm thấy sản phẩm nào</p>
        </div>
      ) : (
        <FixedSizeList
          ref={listRef}
          className="product-list-virtualized"
          height={600}
          width="100%"
          itemCount={sorted.length}
          itemSize={ITEM_HEIGHT}
          overscanCount={3}
        >
          {Row}
        </FixedSizeList>
      )}
    </div>
  );
}