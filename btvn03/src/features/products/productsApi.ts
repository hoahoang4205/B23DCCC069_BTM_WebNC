import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Product } from '../../types';

const MOCK_PRODUCTS: Product[] = [
  { id: 'P001', name: 'Cà phê đen', price: 15000, stock: 120 },
  { id: 'P002', name: 'Bánh mì thịt', price: 18000, stock: 45 },
  { id: 'P003', name: 'Nước suối 500ml', price: 7000, stock: 200 },
  { id: 'P004', name: 'Trà sữa trân châu', price: 25000, stock: 60 },
  { id: 'P005', name: 'Bánh ngọt', price: 22000, stock: 30 },
  { id: 'P006', name: 'Snack khoai tây', price: 12000, stock: 150 },
  { id: 'P007', name: 'Kem vani', price: 10000, stock: 80 },
  { id: 'P008', name: 'Nước cam tươi', price: 20000, stock: 50 },
];

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      queryFn: async () => {
        await new Promise((resolve) => setTimeout(resolve, 800));
        return { data: MOCK_PRODUCTS };
      },
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
