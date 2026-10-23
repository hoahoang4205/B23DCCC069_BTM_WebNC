import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MOCK_PRODUCTS } from "@/lib/products";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = MOCK_PRODUCTS.find((item) => item.id === id);

  if (!product) {
    return { title: "Không tìm thấy sản phẩm" };
  }

  return {
    title: product.name,
    description: product.description,
    alternates: {
      canonical: `/products/${product.id}`,
    },
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
      type: "website",
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = MOCK_PRODUCTS.find((item) => item.id === id);

  if (!product) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: new URL(product.image, "http://localhost:3000").toString(),
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "VND",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <article className="rounded-lg bg-white p-6 shadow">
        <div className="relative mb-6 h-80 w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-contain"
            priority
          />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
        <p className="mt-4 text-gray-600">{product.description}</p>
        <p className="mt-4 text-2xl font-bold text-red-500">
          {product.price.toLocaleString("vi-VN")}đ
        </p>
      </article>
    </main>
  );
}
