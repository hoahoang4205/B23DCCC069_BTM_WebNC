import { useFavoritesStore } from '../stores/favoritesStore';

export default function FavoritesList() {
  const favorites = useFavoritesStore((state) => state.favorites);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const clearAll = useFavoritesStore((state) => state.clearAll);

  if (favorites.length === 0) {
    return <section className="empty-state"><div className="empty-icon" aria-hidden="true">💔</div><h3>Chưa có sản phẩm yêu thích nào</h3><p>Bấm ♡ trên sản phẩm để thêm vào đây</p></section>;
  }

  return (
    <section className="favorites-list">
      <div className="section-header">
        <h2 className="section-title">❤️ Danh sách yêu thích ({favorites.length})</h2>
        <button className="btn-clear" onClick={clearAll} type="button">🗑 Xoá tất cả</button>
      </div>
      <div className="grid">
        {favorites.map((product) => (
          <article key={product.id} className="product-card">
            <div className="product-icon" aria-hidden="true">{product.icon}</div>
            <div className="product-info"><h3 className="product-name">{product.name}</h3><p className="product-price">{product.price.toLocaleString('vi-VN')}đ · Còn {product.stock}</p><p className="product-meta">{product.category}</p></div>
            <button className="fav-btn active" onClick={() => toggleFavorite(product)} aria-label="Bỏ yêu thích" type="button">❤️</button>
          </article>
        ))}
      </div>
    </section>
  );
}