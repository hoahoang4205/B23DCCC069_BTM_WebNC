import Accordion from './components/Accordion/Accordion';
import ProductList from './assets/pages/ProductList';

export default function App() {
  return (
    <div style={{ maxWidth: 700, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>Bài tập tuần 2 — Accordion & usePagination</h1>

      <section>
        <h2>1. Compound Component Accordion</h2>
        <Accordion defaultOpenId="1">
          <Accordion.Item id="1">
            <Accordion.Header>Giới thiệu</Accordion.Header>
            <Accordion.Panel>
              Nội dung giới thiệu. Click mục khác → panel này tự đóng.
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item id="2">
            <Accordion.Header>Chi tiết</Accordion.Header>
            <Accordion.Panel>
              Nội dung chi tiết. Chỉ 1 panel mở tại một thời điểm.
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item id="3">
            <Accordion.Header>Liên hệ</Accordion.Header>
            <Accordion.Panel>
              Email: hghoa2005@gmail.com
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </section>

      <hr style={{ margin: '32px 0' }} />

      <section>
        <h2>2. Danh sách sản phẩm có phân trang</h2>
        <ProductList />
      </section>
    </div>
  );
}