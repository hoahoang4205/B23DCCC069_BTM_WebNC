# BÁO CÁO BÀI TẬP TUẦN 8 - NEXT.JS NÂNG CAO


## 1. Sơ đồ các lớp bảo vệ

Hệ thống được thiết kế bảo vệ nhiều lớp, đảm bảo dữ liệu và quyền hạn được kiểm tra chặt chẽ từ ngoài vào trong:

| Lớp bảo vệ | Công nghệ áp dụng | Nhiệm vụ | File triển khai |
| :--- | :--- | :--- | :--- |
| **Lớp 1: Edge Middleware** | `middleware.ts` | Chặn sớm các request chưa đăng nhập truy cập vào `/dashboard`, `/admin`. Điều hướng về `/login`. | `src/middleware.ts` |
| **Lớp 2: Server Component** | `auth()` và hàm `can()` | Kiểm tra quyền (Role) trước khi render dữ liệu ở Server. Nếu User thường vào `/admin` sẽ bị chặn (403). | `src/app/admin/page.tsx` |
| **Lớp 3: Server Action** | `auth()` + `zod` | Kiểm tra quyền ngay tại thời điểm gọi hàm (xoá sản phẩm). Validate dữ liệu đầu vào (input) để chống mã độc hoặc ID không hợp lệ. | `src/app/actions/product.ts` |
| **Lớp 4: Tầng dữ liệu** | Mock Data / ORM | Luôn thao tác dựa trên ID phiên đăng nhập (nếu là user) và kiểm tra chặt chẽ trước khi ghi/xoá. | `src/lib/products.ts` |

## 2. Kết quả kiểm thử Phân quyền (RBAC)

- **Tài khoản User (GitHub OAuth):**
  - Truy cập `/dashboard`: Thành công.
  - Truy cập `/admin`: Bị chặn bởi Lớp 2, hiển thị cảnh báo `403 - Bạn không có quyền truy cập trang này`.
- **Tài khoản Admin (Credentials - `admin@test.com`):**
  - Truy cập `/dashboard` và `/admin`: Thành công.
  - Thực hiện xoá sản phẩm qua Server Action: Thành công (sản phẩm bị xoá khỏi danh sách).

## 3. Kết quả tối ưu SEO (Lighthouse)

Đo lường trên trang chi tiết sản phẩm (`/products/1`) ở môi trường Production (`npm run build && npm start`), chế độ Mobile.

| Chỉ số | Trước khi tối ưu (Nhiệm vụ 2) | Sau khi tối ưu (Nhiệm vụ 3) |
| :--- | :---: | :---: |
| **SEO Score** | **~85** (Thiếu Meta, JSON-LD) | **100** |
| **Performance** | 96 | 96 |
| **Accessibility** | 100 | 100 |
| **Best Practices** | 100 | 100 |

Nhận xét:
- Việc bổ sung Metadata động và Structured Data (JSON-LD) đã giúp điểm SEO đạt mức tối đa 100.
- Tối ưu ảnh bằng `next/image` giúp chỉ số LCP (Largest Contentful Paint) đạt 1.9s (Mức Tốt - Good).

## 4. Bằng chứng SEO hoạt động (View-source)

- **Metadata & OpenGraph:** Đã kiểm tra bằng tính năng `View page source` (Ctrl+U). HTML thô từ server đã chứa:
  - Thẻ `<title>Giày chạy bộ Pro | My Shop</title>`
  - Thẻ `<meta name="description" ...>`
  - Thẻ `<link rel="canonical" href="http://localhost:3000/products/1" />`
- **Structured Data:** Thẻ `<script type="application/ld+json">` chứa schema `Product` với đầy đủ Tên, Giá (1.200.000 VNĐ) và Tình trạng còn hàng.
