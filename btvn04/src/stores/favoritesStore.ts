import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../types';

interface FavoritesState {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (id: string) => boolean;
  clearAll: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (product) => {
        const favorites = get().favorites;
        const exists = favorites.some((favorite) => favorite.id === product.id);
        set({
          favorites: exists
            ? favorites.filter((favorite) => favorite.id !== product.id)
            : [...favorites, product],
        });
      },
      isFavorite: (id) => get().favorites.some((favorite) => favorite.id === id),
      clearAll: () => set({ favorites: [] }),
    }),
    { name: 'favorites-store' },
  ),
);