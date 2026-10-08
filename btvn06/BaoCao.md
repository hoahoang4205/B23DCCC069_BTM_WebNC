# BÁO CÁO KIỂM THỬ — BÀI TẬP TUẦN 6

## 1. Thông tin chung

| Mục | Chi tiết |
|-----|----------|
| Module kiểm thử | Giỏ hàng (cart) + Sản phẩm (products) |
| Framework | Jest + ts-jest + React Testing Library |
| Tổng test case | 17 |
| Coverage | 96.96% statements |

## 2. Kết quả

| Chỉ số | Kết quả |
|--------|:-------:|
| Test Suites | 4 passed |
| Test Cases | 17 passed |
| Statements | 96.96% |
| Branches | 92.85% |
| Functions | 94.73% |
| Lines | 98.3% |

## 3. Phân loại test

### Unit — Hàm & Reducer (8 test)
**File**: `cartSlice.test.ts`
- `addItem` (3): thêm mới, tăng quantity khi trùng, cập nhật tổng
- `removeItem` (2): xoá đúng id, xử lý id không tồn tại
- `updateQuantity` (3): cập nhật số lượng, chặn ≤ 0, cập nhật tổng tiền

### Unit — Custom Hook (2 test)
**File**: `useCartTotal.test.tsx`
- Trả về 0 khi giỏ rỗng
- Trả về đúng tổng khi có sản phẩm

### Integration — Component (4 test)
**File**: `CartSummary.test.tsx`
- Hiển thị "Giỏ hàng trống" khi rỗng
- Hiển thị đúng tên sản phẩm
- Click "Xoá" → sản phẩm bị xoá
- Đổi số lượng → tổng tiền cập nhật

### Async — API mock (3 test)
**File**: `ProductList.test.tsx`
- Hiển thị "Đang tải" khi fetch pending
- Hiển thị danh sách khi API thành công
- Hiển thị nút "Thêm vào giỏ"

**Mock API**: `global.fetch = jest.fn()` — không gọi mạng thật.

## 4. Kỹ thuật áp dụng

- Jest + ts-jest (TypeScript)
- React Testing Library (test hành vi)
- userEvent (mô phỏng thao tác)
- Redux Provider wrapper
- `renderHook` cho custom hook
- Mock API: `global.fetch = jest.fn()`
- Edge cases: id không tồn tại, quantity = 0


## 5. Ảnh minh chứng
 src/assets/coverage.png