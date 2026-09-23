import { MOCK_PRODUCTS } from '../data/products';
import ProductCard from './ProductCard';

export default function ProductList() {
  return (
    <section className="product-list">
      <h2 className="section-title">📦 Tất cả sản phẩm</h2>
      <div className="grid">
        {MOCK_PRODUCTS.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </section>
  );
}