NHẬN XÉT: ZUSTAND vs REDUX TOOLKIT (Tính năng "Sản phẩm yêu thích")

1. Khối lượng code
- Zustand: code tối ưu cho toàn bộ store, không cần slice/action type/reducer
  riêng. Selector tự động chỉ re-render đúng component cần thiết.
- Redux Toolkit: phải tách slice, configureStore, action creator và có sự liên kết.
→ Zustand ngắn hơn.

2. Provider
- Zustand: không cần <Provider> bọc App, import store dùng trực tiếp ở bất kỳ file nào.
- Redux Toolkit: bắt buộc bọc <Provider store={store}> trong main.tsx.
→ Zustand tích hợp vào dự án có sẵn dễ hơn.

3. Cách gọi action
- Zustand: useFavoritesStore(s => s.toggleFavorite) — gọi như hàm thường.
- Redux Toolkit: dispatch(toggleFavorite(product)) — phải qua dispatch.
→ Zustand ít boilerplate hơn.

4. Persist dữ liệu
- Zustand: middleware persist có sẵn, chỉ khai báo name là tự lưu localStorage.
- Redux Toolkit: phải tự viết useEffect hoặc middleware để sync.
→ Zustand tiện hơn cho state nhỏ.

5. DevTools & Debug
- Zustand: DevTools không tích hợp sẵn, phải cài middleware devtools mới xem được.
- Redux Toolkit: DevTools bật sẵn qua configureStore, xem được timeline, time-travel.
→ Redux Toolkit mạnh hơn khi debug.

6. Xử lý bất đồng bộ
- Zustand: tự quản lý loading/error bằng tay, dễ quên set trạng thái.
- Redux Toolkit: createAsyncThunk tự sinh 3 trạng thái pending/fulfilled/rejected.
→ Redux Toolkit chuẩn hoá hơn cho async.

7. Khả năng mở rộng
- Zustand: phù hợp state đơn giản, nhiều slice liên quan chéo thì khó tổ chức.
- Redux Toolkit: tách nhiều slice theo feature, dễ làm việc nhóm, dễ scale.
→ Redux Toolkit phù hợp dự án lớn.
