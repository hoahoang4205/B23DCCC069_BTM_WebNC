import Image from "next/image";
import Link from "next/link";
import { MOCK_PRODUCTS } from "@/lib/products";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">
        Sản phẩm nổi bật
      </h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {MOCK_PRODUCTS.map((product, index) => (
          <Link
            href={`/products/${product.id}`}
            key={product.id}
            className="rounded-lg border border-gray-200 p-4 transition hover:shadow-lg"
          >
            <div className="relative mb-4 h-48 w-full">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority={index === 0}
                sizes="(min-width: 768px) 33vw, 100vw"
                className="rounded object-cover"
              />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              {product.name}
            </h2>
            <p className="mt-2 font-bold text-red-500">
              {product.price.toLocaleString("vi-VN")}đ
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
