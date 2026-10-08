# BÁO CÁO KIỂM THỬ — BÀI TẬP TUẦN 6

## 1. Thông tin chung

- **Module kiểm thử**: Giỏ hàng (cart) + Sản phẩm (products)
- **Framework**: Jest + ts-jest + React Testing Library
- **Tổng test case**: 17
- **Coverage**: 96.96% statements

## 2. Kết quả

| Chỉ số | Kết quả |
|--------|---------|
| Test Suites | 4 passed |
| Test Cases | 17 passed |
| Statements | 96.96% |
| Branches | 92.85% |
| Functions | 94.73% |
| Lines | 98.3% |

## 3. Phân loại test

### Unit — Hàm & Reducer (8 test)
**File**: `cartSlice.test.ts`

Test reducer `cartSlice` với các action chính:

- `addItem` (3 test): thêm mới, tăng quantity khi trùng, cập nhật tổng
- `removeItem` (2 test): xoá đúng id, xử lý id không tồn tại (edge case)
- `updateQuantity` (3 test): cập nhật số lượng, chặn quantity ≤ 0, cập nhật tổng tiền

### Unit — Custom Hook (2 test)
**File**: `useCartTotal.test.tsx`

Test hook đọc state từ Redux store:
- Trả về 0 khi giỏ rỗng
- Trả về đúng tổng khi có sản phẩm

Dùng `renderHook` + wrapper `<Provider>` để chạy hook trong môi trường test.

### Integration — Component (4 test)
**File**: `CartSummary.test.tsx`

Test component kết hợp React + Redux + RTL:
- Hiển thị "Giỏ hàng trống" khi rỗng
- Hiển thị đúng tên sản phẩm
- Click nút "Xoá" → sản phẩm bị xoá
- Đổi số lượng → tổng tiền cập nhật

Dùng `userEvent` mô phỏng thao tác người dùng, query theo `getByRole`.

### Async — API mock (3 test)
**File**: `ProductList.test.tsx`

Test luồng bất đồng bộ khi gọi API:
- Hiển thị "Đang tải" khi fetch pending
- Hiển thị danh sách khi API thành công
- Hiển thị nút "Thêm vào giỏ" cho mỗi sản phẩm

**Mock API** bằng `global.fetch = jest.fn()` — không gọi mạng thật. Dùng `waitFor` chờ bất đồng bộ.

## 4. Kỹ thuật áp dụng

- Jest + ts-jest (TypeScript)
- React Testing Library (test hành vi)
- userEvent (mô phỏng thao tác)
- Redux Provider wrapper
- `renderHook` cho custom hook
- **Mock API**: `global.fetch = jest.fn()`
- Edge cases: id không tồn tại, quantity = 0


## 5. Ảnh minh chứng
 src/assets/coverage.png