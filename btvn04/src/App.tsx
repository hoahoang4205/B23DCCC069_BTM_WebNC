import { useState } from 'react';
import FavoritesList from './components/FavoritesList';
import Header from './components/Header';
import ProductList from './components/ProductList';
import './App.css';

type Tab = 'products' | 'favorites';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('products');

  return (
    <div className="app">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="app-main">{activeTab === 'products' ? <ProductList /> : <FavoritesList />}</main>
    </div>
  );
}

export default App;
