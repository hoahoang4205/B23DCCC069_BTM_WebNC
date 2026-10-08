import ProductList from './features/products/ProductList';
import CartSummary from './features/cart/CartSummary';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Circle Store</h1>
      </header>
      <main className="app-main">
        <section className="left">
          <ProductList />
        </section>
        <section className="right">
          <CartSummary />
        </section>
      </main>
    </div>
  );
}
