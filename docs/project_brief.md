# 📘 StoryMap - Character Relationship Designer

## 🎯 MỤC TIÊU DỰ ÁN

Xây dựng một ứng dụng web dạng mindmap giúp người dùng (biên kịch, nhà văn, người viết truyện, nhà thiết kế game…) thiết kế, trực quan hóa và quản lý mối quan hệ giữa các nhân vật trong một tuyến truyện.

---

## 🧩 CHỨC NĂNG CHÍNH

### 1. Quản lý Mindmap
- ✅ Tạo mới một mindmap (kèm tên và mô tả).
- ✅ Danh sách mindmap của người dùng (giao diện danh sách).
- ✅ Xóa, đổi tên mindmap.
- ✅ Lưu trữ mindmap trên LocalStorage hoặc GitHub (tuỳ cấu hình ban đầu).

### 2. Node - Nhân vật
- ✅ Thêm node mới (nhân vật mới): Tên, mô tả, ảnh đại diện (optional).
- ✅ Chỉnh sửa node.
- ✅ Xóa node.
- ✅ Kéo thả node tự do trên canvas để sắp xếp bố cục.
- ✅ Tìm kiếm node theo tên.

### 3. Mối quan hệ giữa các node
- ✅ Tạo các mối liên kết giữa node A và B.
  - Ghi chú/loại quan hệ (ví dụ: “cha con”, “kẻ thù”, “đồng đội”…).
  - Một node có thể có nhiều liên kết tới các node khác.
- ✅ Giao diện hiển thị đường kết nối rõ ràng (có thể là line, curve…).
- ✅ Xóa/chỉnh sửa quan hệ.

### 4. UI & Trực quan hóa
- ✅ Canvas kéo thả mượt mà.
- ✅ Phóng to / thu nhỏ canvas.
- ✅ Di chuyển toàn bộ mindmap (pan mode).
- ✅ Tự động căn chỉnh bố cục (optional).
- ✅ Giao diện responsive trên desktop/tablet.

### 5. Lưu trữ và chia sẻ
- ✅ Tự động lưu trạng thái mindmap vào LocalStorage hoặc IndexedDB.
- ✅ Export toàn bộ mindmap ra JSON.
- ✅ Import mindmap từ JSON.
- ✅ Tùy chọn publish mindmap (read-only) dưới dạng GitHub Pages để chia sẻ.

---

## 🔐 NGƯỜI DÙNG & QUYỀN HẠN

### 1. Guest Mode (không đăng nhập)
- Tạo và chỉnh sửa mindmap tạm thời (lưu LocalStorage).
- Không thể chia sẻ hoặc đồng bộ GitHub.

### 2. Logged-in via GitHub
- Đăng nhập bằng GitHub OAuth.
- Lưu mindmap vào repo cá nhân hoặc tổ chức.
- Quản lý nhiều mindmap và phiên bản trên GitHub.

---

## 🧪 YÊU CẦU PHI CHỨC NĂNG

- ⏱ Ứng dụng chạy mượt trên trình duyệt hiện đại (Chrome, Firefox, Edge).
- 📱 Responsive cơ bản (ưu tiên Desktop).
- 💾 Dữ liệu được lưu cục bộ, bảo mật, không phụ thuộc server.
- 🌐 Có thể deploy trên GitHub Pages.
- 🔌 Mở rộng dễ dàng: Có thể tích hợp AI gợi ý quan hệ giữa nhân vật, phân tích mạng xã hội sau này.

---

## 🛠️ CÔNG NGHỆ ĐỀ XUẤT

| Thành phần         | Công nghệ đề xuất                     |
|--------------------|---------------------------------------|
| Frontend           | React + TailwindCSS                   |
| Mindmap Engine     | [React Flow](https://reactflow.dev/) hoặc D3.js |
| Auth + Storage     | GitHub OAuth + GitHub API + LocalStorage |
| State Management   | Zustand hoặc Redux Toolkit            |
| Build & Deploy     | Vite + GitHub Actions (CI/CD)         |
| Data Format        | JSON (export/import mindmap)          |

---

## 📁 CẤU TRÚC DỰ ÁN (GỢI Ý)

\```
src/
├── components/
│   ├── MindmapCanvas.jsx
│   ├── NodeEditor.jsx
│   ├── RelationEditor.jsx
│   └── Sidebar.jsx
├── pages/
│   ├── Home.jsx
│   ├── Editor.jsx
├── services/
│   ├── githubApi.js
│   ├── localStorage.js
├── utils/
│   ├── graphUtils.js
├── App.jsx
├── main.jsx
\```

> *Lưu ý: bỏ dấu `\` ở đầu và cuối khối code nếu bạn dùng markdown viewer thực tế.*

---

## 📌 GỢI Ý GIAO DIỆN

### Trang chính:
- Danh sách mindmap gần đây.
- Nút "Tạo Mindmap mới".
- Đăng nhập bằng GitHub.

### Trang chỉnh sửa Mindmap:
- Canvas ở trung tâm.
- Sidebar bên phải: Chi tiết nhân vật / Quan hệ.
- Toolbar: Zoom, Pan, Export, Import.

---
