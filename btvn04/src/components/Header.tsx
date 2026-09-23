import { useFavoritesStore } from '../stores/favoritesStore';

interface HeaderProps {
  activeTab: 'products' | 'favorites';
  onTabChange: (tab: 'products' | 'favorites') => void;
}

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  const favoritesCount = useFavoritesStore((state) => state.favorites.length);

  return (
    <header className="app-header">
      <div className="logo"><span className="logo-icon">🛒</span><span className="logo-text">Circle Store</span></div>
      <nav className="tabs" aria-label="Điều hướng cửa hàng">
        <button className={activeTab === 'products' ? 'tab active' : 'tab'} onClick={() => onTabChange('products')} type="button">📦 Sản phẩm</button>
        <button className={activeTab === 'favorites' ? 'tab active' : 'tab'} onClick={() => onTabChange('favorites')} type="button">
          ❤️ Yêu thích
          {favoritesCount > 0 && <span className="badge">{favoritesCount}</span>}
        </button>
      </nav>
      <div className="user-info">👤 Nguyễn Văn A</div>
    </header>
  );
}