export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Giày chạy bộ Pro",
    price: 1_200_000,
    description: "Giày chạy bộ chuyên nghiệp cho runner.",
    image: "/images/shoe.svg",
  },
  {
    id: "2",
    name: "Áo thun thể thao",
    price: 350_000,
    description: "Áo thun thoáng mát, thấm hút mồ hôi.",
    image: "/images/shirt.svg",
  },
  {
    id: "3",
    name: "Bình nước 1L",
    price: 150_000,
    description: "Bình nước giữ nhiệt 12h.",
    image: "/images/bottle.svg",
  },
];
