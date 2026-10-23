import { auth } from "@/auth";
import { MOCK_PRODUCTS } from "@/lib/products";
import { redirect } from "next/navigation";

const monthlyActivity = [
  { month: "T1", value: 42 },
  { month: "T2", value: 64 },
  { month: "T3", value: 51 },
  { month: "T4", value: 78 },
  { month: "T5", value: 58 },
  { month: "T6", value: 92 },
];

const recentOrders = [
  {
    id: "#DH-2406",
    product: "Giày chạy bộ Pro",
    date: "23/10/2026",
    total: 1_200_000,
    status: "Đang giao",
    statusStyle: "bg-blue-50 text-blue-700",
  },
  {
    id: "#DH-2405",
    product: "Áo thun thể thao",
    date: "20/10/2026",
    total: 350_000,
    status: "Hoàn thành",
    statusStyle: "bg-emerald-50 text-emerald-700",
  },
  {
    id: "#DH-2404",
    product: "Bình nước 1L",
    date: "16/10/2026",
    total: 150_000,
    status: "Hoàn thành",
    statusStyle: "bg-emerald-50 text-emerald-700",
  },
];

const formatPrice = (price: number) => `${price.toLocaleString("vi-VN")}đ`;

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const isAdmin = session.user.role === "admin";
  const displayName =
    session.user.name?.trim().split(/\s+/).at(-1) ??
    session.user.email?.split("@")[0] ??
    "bạn";

  const stats = isAdmin
    ? [
        {
          label: "Doanh thu tháng",
          value: "48.250.000đ",
          detail: "+12,8% so với tháng trước",
          icon: "₫",
          color: "text-violet-700 bg-violet-50",
        },
        {
          label: "Đơn hàng",
          value: "128",
          detail: "18 đơn đang xử lý",
          icon: "▤",
          color: "text-blue-700 bg-blue-50",
        },
        {
          label: "Sản phẩm",
          value: String(MOCK_PRODUCTS.length).padStart(2, "0"),
          detail: "Đang được trưng bày",
          icon: "◇",
          color: "text-amber-700 bg-amber-50",
        },
        {
          label: "Khách hàng mới",
          value: "36",
          detail: "+8 khách hàng tuần này",
          icon: "＋",
          color: "text-emerald-700 bg-emerald-50",
        },
      ]
    : [
        {
          label: "Đơn hàng của tôi",
          value: "08",
          detail: "2 đơn đang giao",
          icon: "▤",
          color: "text-blue-700 bg-blue-50",
        },
        {
          label: "Tổng chi tiêu",
          value: "3.450.000đ",
          detail: "Trong 6 tháng gần đây",
          icon: "₫",
          color: "text-violet-700 bg-violet-50",
        },
        {
          label: "Điểm thành viên",
          value: "640",
          detail: "Còn 360 điểm lên hạng",
          icon: "✦",
          color: "text-amber-700 bg-amber-50",
        },
        {
          label: "Ưu đãi của bạn",
          value: "03",
          detail: "Có ưu đãi sắp hết hạn",
          icon: "%",
          color: "text-rose-700 bg-rose-50",
        },
      ];

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-slate-50">
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6 lg:py-10">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-900 px-6 py-8 text-white shadow-lg sm:px-10 sm:py-10">
          <div className="relative z-10 max-w-2xl">
            <p className="text-sm font-medium text-blue-200">
              {isAdmin ? "KHU VỰC QUẢN TRỊ" : "TÀI KHOẢN CỦA BẠN"}
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Xin chào, {displayName}!
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
              {isAdmin
                ? "Đây là tổng quan hoạt động cửa hàng. Chúc bạn có một ngày làm việc hiệu quả."
                : "Theo dõi đơn hàng, điểm thành viên và khám phá những món đồ thể thao phù hợp với bạn."}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-100">
                {isAdmin ? "Quản trị viên" : "Khách hàng"}
              </span>
              <span className="text-sm text-slate-300">
                {session.user.email}
              </span>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="absolute -right-16 -top-28 h-80 w-80 rounded-full border-[36px] border-white/5"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-40 right-28 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl"
          />
        </section>

        <section
          aria-label="Thống kê tổng quan"
          className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {stats.map((stat) => (
            <article
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {stat.label}
                  </p>
                  <p className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
                    {stat.value}
                  </p>
                </div>
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl font-bold ${stat.color}`}
                >
                  {stat.icon}
                </span>
              </div>
              <p className="mt-4 text-xs text-slate-500">{stat.detail}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {isAdmin ? "Doanh thu cửa hàng" : "Hoạt động mua sắm"}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Thống kê minh họa trong 6 tháng gần đây
                </p>
              </div>
              <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                +12,8%
              </span>
            </div>
            <div
              aria-label="Biểu đồ hoạt động từ tháng 1 đến tháng 6"
              className="mt-8 flex h-48 items-end justify-between gap-3 border-b border-slate-100 pb-2"
            >
              {monthlyActivity.map((item) => (
                <div
                  key={item.month}
                  className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                >
                  <div
                    className="w-full max-w-12 rounded-t-lg bg-gradient-to-t from-blue-700 to-cyan-400 transition-all hover:from-blue-800"
                    style={{ height: `${item.value}%` }}
                    title={`${item.month}: ${item.value}%`}
                  />
                  <span className="text-xs text-slate-500">{item.month}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-slate-400">
              * Số liệu được tạo để minh họa giao diện, chưa kết nối cơ sở dữ
              liệu.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {isAdmin ? "Tình trạng đơn hàng" : "Hạng thành viên"}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {isAdmin
                    ? "Cập nhật tổng quan hôm nay"
                    : "Tiến độ tích lũy điểm"}
                </p>
              </div>
              <span className="text-2xl" aria-hidden="true">
                {isAdmin ? "📦" : "🏅"}
              </span>
            </div>
            {isAdmin ? (
              <div className="mt-7 space-y-5">
                {[
                  { label: "Hoàn thành", count: "86 đơn", percent: 68 },
                  { label: "Đang xử lý", count: "28 đơn", percent: 22 },
                  { label: "Đang giao", count: "14 đơn", percent: 11 },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="text-slate-600">{item.label}</span>
                      <span className="font-semibold text-slate-900">
                        {item.count}
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-blue-600"
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="mt-7 flex items-end justify-between">
                  <p className="text-3xl font-bold text-slate-900">
                    640{" "}
                    <span className="text-sm font-medium text-slate-500">
                      điểm
                    </span>
                  </p>
                  <p className="text-sm font-medium text-indigo-700">Bạc</p>
                </div>
                <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[64%] rounded-full bg-gradient-to-r from-blue-600 to-cyan-400" />
                </div>
                <p className="mt-3 text-sm text-slate-500">
                  Mua sắm thêm để đạt mốc <strong>1.000 điểm</strong> và mở
                  khóa hạng Vàng.
                </p>
                <div className="mt-6 rounded-xl bg-amber-50 p-4">
                  <p className="text-sm font-semibold text-amber-900">
                    Ưu đãi dành cho bạn
                  </p>
                  <p className="mt-1 text-sm text-amber-800">
                    Giảm 10% cho đơn hàng tiếp theo.
                  </p>
                </div>
              </>
            )}
          </article>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between gap-3 px-5 py-5 sm:px-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {isAdmin ? "Đơn hàng gần đây" : "Đơn hàng của bạn"}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Một vài giao dịch gần nhất
                </p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                3 đơn
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-3 font-semibold sm:px-6">Mã đơn</th>
                    <th className="px-5 py-3 font-semibold">Sản phẩm</th>
                    <th className="px-5 py-3 font-semibold">Ngày đặt</th>
                    <th className="px-5 py-3 font-semibold">Tổng tiền</th>
                    <th className="px-5 py-3 font-semibold">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="whitespace-nowrap px-5 py-4 font-semibold text-blue-700 sm:px-6">
                        {order.id}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-slate-700">
                        {order.product}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-slate-500">
                        {order.date}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 font-medium text-slate-900">
                        {formatPrice(order.total)}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${order.statusStyle}`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Sản phẩm nổi bật
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Gợi ý từ cửa hàng
                </p>
              </div>
              <span className="text-xl" aria-hidden="true">
                ✨
              </span>
            </div>
            <ul className="mt-5 divide-y divide-slate-100">
              {MOCK_PRODUCTS.map((product, index) => (
                <li
                  key={product.id}
                  className="flex items-center justify-between gap-3 py-4 first:pt-0 last:pb-0"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-700">
                      0{index + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-800">
                        {product.name}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-emerald-700">
                    Còn hàng
                  </span>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <p className="text-center text-xs text-slate-400">
          Dashboard đang sử dụng dữ liệu mẫu để trình bày giao diện.
        </p>
      </div>
    </main>
  );
}
