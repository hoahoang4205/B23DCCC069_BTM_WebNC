import { memo } from 'react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (id: string) => void;
}

const ProductCard = memo(function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className="product-card">
      <div className="product-icon">{product.icon}</div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-meta">
          Còn {product.stock} · {product.category}
        </p>
      </div>

      <div className="product-actions">
        <p className="product-price">
          {product.price.toLocaleString('vi-VN')}đ
        </p>
        <button
          className="btn-add"
          onClick={() => onAddToCart(product.id)}
        >
          + Thêm
        </button>
      </div>
    </div>
  );
});

export default ProductCard;