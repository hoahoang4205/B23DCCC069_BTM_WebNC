import type { Product } from '../types'

const CATEGORIES = ['Đồ uống', 'Thực phẩm', 'Gia dụng', 'Điện tử', 'Văn phòng']
const ICONS = ['☕', '🍞', '💧', '🧋', '🍰', '🥔', '🍦', '🍊', '🍕', '🍜']

export const MOCK_PRODUCTS: Product[] = Array.from({ length: 10_000 }, (_, i) => ({
  id: `P${String(i + 1).padStart(5, '0')}`,
  name: `Sản phẩm ${i + 1}`,
  price: 5000 + ((i * 137) % 100000),
  stock: (i * 7) % 500 + 1,
  category: CATEGORIES[i % CATEGORIES.length],
  icon: ICONS[i % ICONS.length],
}))