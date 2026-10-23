"use server";

import { auth } from "@/auth";
import { can } from "@/lib/permissions";
import { MOCK_PRODUCTS } from "@/lib/products";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const DeleteSchema = z.object({
  id: z.string().min(1),
});

export async function deleteProduct(formData: FormData) {
  const session = await auth();

  if (!can(session?.user?.role, "product:delete")) {
    throw new Error("Không có quyền xoá sản phẩm");
  }

  const parsed = DeleteSchema.safeParse({ id: formData.get("id") });
  if (!parsed.success) {
    throw new Error("Dữ liệu không hợp lệ");
  }

  const index = MOCK_PRODUCTS.findIndex(
    (product) => product.id === parsed.data.id,
  );
  if (index !== -1) {
    MOCK_PRODUCTS.splice(index, 1);
  }

  revalidatePath("/");
  revalidatePath("/admin");
}
