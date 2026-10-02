# BÁO CÁO TỐI ƯU HIỆU NĂNG — TRANG QUẢN LÝ 10.000 SẢN PHẨM

## 1. Mô tả trang

Trang `ProductListPage` hiển thị 10.000 sản phẩm với chức năng: tìm kiếm theo tên, sắp xếp theo tên/giá, thêm vào giỏ hàng. Đây là dạng trang quản lý điển hình với dữ liệu lớn, thao tác tìm kiếm/sắp xếp thường xuyên, cần phản hồi nhanh khi người dùng tương tác.

## 2. Đo lường trước tối ưu

Chạy Lighthouse 3 lần (Mobile, Chrome ẩn danh, `npm run build && npm run preview`):

| Chỉ số | Lần 1 | Lần 2 | Lần 3 | Trung bình |
|--------|:-----:|:-----:|:-----:|:----------:|
| Performance | 76 | 74 | 80 | **76.7** |
| FCP | 1.3s | 1.2s | 1.8s | **1.43s** |
| LCP | 1.6s | 1.6s | 1.8s | **1.67s** |
| TBT | 1230ms | 1400ms | 760ms | **1130ms** |
| CLS | 0 | 0 | 0 | **0** |

→ **TBT = 1130ms** là vấn đề lớn nhất (ngưỡng tốt < 200ms). FCP và LCP ở mức trung bình. CLS = 0 là điểm sáng.

Khi trải nghiệm thực tế: cuộn danh sách bị giật, gõ search bị delay 0.5-1s, click sort thì trang đơ một lúc mới cập nhật.

## 3. Nguyên nhân

**1. Render 10.000 DOM node cùng lúc** — nguyên nhân lớn nhất. Dòng `sorted.map(...)` khiến React tạo 10.000 thẻ `<div>` ngay khi load, dù màn hình chỉ hiển thị được ~10 card. Browser phải xử lý layout/paint cho toàn bộ → main thread bị block ~1s → TBT cao. Đây là vấn đề **không thể giải quyết bằng memoization** vì gốc rễ nằm ở số lượng DOM node.

**2. Filter chạy mỗi lần render** dù `keyword` không đổi. Với 10.000 items, mỗi lần filter mất 5-10ms. Component re-render vì nhiều lý do khác (cart thay đổi, sort thay đổi...) nên filter bị chạy lại vô ích nhiều lần.

**3. Sort chạy mỗi lần render** — tương tự filter, sort 10.000 phần tử tốn 15-20ms mỗi lần nhưng chỉ cần thiết khi `filtered` hoặc `sortBy` thay đổi.

**4. Handler `onAddToCart` tạo mới mỗi render** → `ProductCard` nhận prop mới mỗi lần cha re-render → toàn bộ card re-render thừa. Điểm tinh tế: ngay cả khi bọc `React.memo` cho card, nếu handler vẫn tạo mới thì memo cũng vô tác dụng vì React so sánh props theo tham chiếu.

**5. Không có debounce** — mỗi keystroke trigger 1 lần filter. Gõ 8 ký tự → 8 lần filter trong 1 giây → CPU spike, input bị delay.

## 4. Kỹ thuật áp dụng

| Kỹ thuật | Giải quyết |
|----------|-----------|
| **Virtualization** (`react-window`) | 10.000 DOM → ~15 DOM |
| **React.memo** cho `ProductCard` | Chặn re-render khi props không đổi |
| **useCallback** cho handler | Ổn định tham chiếu → memo phát huy tác dụng |
| **useMemo** cho filter + sort | Chỉ tính lại khi dependency đổi |
| **useDebounce** cho search | Giảm 90% số lần filter khi gõ |

**Virtualization** là kỹ thuật quan trọng nhất. Thay `sorted.map(...)` bằng `FixedSizeList` — chỉ render card đang nằm trong viewport (~10 card) + overscan. Khi scroll, list tự tính index và mount/unmount card tương ứng. Chọn `react-window` (~2KB) thay vì `react-virtualized` (~30KB) vì bài toán chỉ cần list dọc 1 cột.

**React.memo + useCallback** phải dùng cùng nhau mới hiệu quả. `React.memo` so sánh props nông, còn `useCallback` giữ nguyên tham chiếu hàm. Nếu chỉ bọc memo mà không bọc useCallback → props handler luôn khác nhau theo tham chiếu → memo vô nghĩa.

**useMemo cho filter + sort** chỉ chạy lại khi dependency thực sự đổi. Không dùng useMemo cho mọi thứ vì bản thân nó cũng tốn chi phí so sánh — chỉ dùng cho tính toán nặng.

**useDebounce** tự viết: keyword chỉ đẩy vào filter 300ms sau khi user ngừng gõ. Chọn debounce thay vì throttle vì search cần chờ nhập xong mới xử lý, không cần chạy đều đặn.

## 5. Đo lường sau tối ưu

| Chỉ số | Lần 1 | Lần 2 | Lần 3 | Trung bình |
|--------|:-----:|:-----:|:-----:|:----------:|
| Performance | 100 | 100 | 100 | **100** |
| FCP | 1.3s | 1.3s | 1.3s | **1.3s** |
| LCP | 1.4s | 1.4s | 1.4s | **1.4s** |
| TBT | 0ms | 0ms | 0ms | **0ms** |
| CLS | 0 | 0 | 0 | **0** |

Performance đạt điểm tuyệt đối 100, ổn định qua cả 3 lần chạy. TBT giảm từ 1130ms xuống 0ms — main thread hoàn toàn rảnh rỗi sau khi render, user tương tác được ngay. Trải nghiệm thực tế: cuộn mượt, gõ search không delay, click sort cập nhật tức thì.

## 6. So sánh trước/sau

| Chỉ số | Trước | Sau | Cải thiện |
|--------|:-----:|:---:|:---------:|
| Performance | 76.7 | **100** | **+23.3 (+30%)** |
| FCP | 1.43s | **1.3s** | **-9%** |
| LCP | 1.67s | **1.4s** | **-16%** |
| TBT | 1130ms | **0ms** | **-100%** |
| DOM nodes | ~10.000 | **~15** | **-99.85%** |

→ 3 chỉ số cải thiện rõ rệt (vượt yêu cầu "ít nhất 2 chỉ số").

## 7. Nhận xét

- **Virtualization là kỹ thuật quan trọng nhất** với danh sách lớn. Memoization không giúp giảm số DOM node — mà đó mới là gốc rễ vấn đề.
- **Memoization phải dùng đúng cặp**: `React.memo` cho con + `useCallback` cho handler ở cha. Thiếu một trong hai thì memo vô nghĩa.
- **Không lạm dụng useMemo/useCallback** — bản thân chúng có chi phí so sánh, chỉ dùng cho tính toán nặng.
- **Debounce** cải thiện UX rõ rệt nhưng không ảnh hưởng nhiều đến điểm Lighthouse.
- **Đo đúng cách**: dùng `build + preview` (không dùng `dev`), Chrome ẩn danh, chạy 3 lần lấy trung bình.

## 8. Kết luận

Trang đạt điểm Lighthouse tuyệt đối 100, TBT giảm từ 1130ms xuống 0ms nhờ áp dụng đúng 5 kỹ thuật — mỗi kỹ thuật giải quyết đúng một nguyên nhân cụ thể, không tối ưu ngẫu nhiên. Bài học lớn nhất: **đo trước, tối ưu sau**, và **virtualization là bắt buộc với danh sách lớn**.