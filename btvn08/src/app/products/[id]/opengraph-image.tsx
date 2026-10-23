import { ImageResponse } from "next/og";
import { MOCK_PRODUCTS } from "@/lib/products";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = MOCK_PRODUCTS.find((item) => item.id === id);
  const name = product?.name ?? "Sản phẩm";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <h1 style={{ fontSize: 80, fontWeight: "bold", color: "#000" }}>
          {name}
        </h1>
        <p style={{ fontSize: 40, color: "#e11d48" }}>My Shop Thể Thao</p>
      </div>
    ),
    { ...size },
  );
}
