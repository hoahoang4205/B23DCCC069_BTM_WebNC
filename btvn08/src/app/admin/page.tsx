import { auth } from "@/auth";
import { deleteProduct } from "@/app/actions/product";
import { can } from "@/lib/permissions";
import { MOCK_PRODUCTS } from "@/lib/products";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (!can(session.user.role, "product:delete")) {
    return (
      <main className="p-8 text-center text-red-500">
        <h1>403 - Bạn không có quyền truy cập trang này</h1>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="mb-6 text-2xl font-bold">Trang Quản Trị (Admin)</h1>

      <section className="rounded bg-white p-4 shadow">
        <h2 className="mb-4 text-lg font-semibold">Danh sách sản phẩm</h2>
        <ul className="space-y-4">
          {MOCK_PRODUCTS.map((product) => (
            <li
              key={product.id}
              className="flex items-center justify-between border-b pb-2"
            >
              <span>
                {product.name} - {product.price.toLocaleString("vi-VN")}đ
              </span>

              <form action={deleteProduct}>
                <input type="hidden" name="id" value={product.id} />
                <button
                  type="submit"
                  className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                >
                  Xoá
                </button>
              </form>
            </li>
          ))}
          {MOCK_PRODUCTS.length === 0 && (
            <li className="text-sm text-gray-500">
              Không còn sản phẩm nào.
            </li>
          )}
        </ul>
      </section>
    </main>
  );
}
