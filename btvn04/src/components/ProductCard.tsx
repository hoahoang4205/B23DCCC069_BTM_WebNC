import { useFavoritesStore } from '../stores/favoritesStore';
import type { Product } from '../types';

interface ProductCardProps { product: Product; }

export default function ProductCard({ product }: ProductCardProps) {
  const isFav = useFavoritesStore((state) => state.favorites.some((favorite) => favorite.id === product.id));
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  return (
    <article className="product-card">
      <div className="product-icon" aria-hidden="true">{product.icon}</div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">{product.price.toLocaleString('vi-VN')}đ</p>
        <p className="product-meta">Còn {product.stock} sản phẩm · {product.category}</p>
      </div>
      <button className={isFav ? 'fav-btn active' : 'fav-btn'} onClick={() => toggleFavorite(product)} aria-label={isFav ? 'Bỏ yêu thích' : 'Thêm yêu thích'} type="button">
        {isFav ? '❤️' : '♡'}
      </button>
    </article>
  );
}