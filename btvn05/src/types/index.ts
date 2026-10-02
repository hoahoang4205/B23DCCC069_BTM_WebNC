export interface Product {
  id: string
  name: string
  price: number
  stock: number
  category: string
  icon: string
}

export type SortBy = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc'