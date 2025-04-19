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
  - Ghi chú/loại quan hệ (ví dụ: "cha con", "kẻ thù", "đồng đội"…).
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

# StoryMap - Task Breakdown

## Setup & Infrastructure
- [ ] Task 1: Initialize React + Vite project with TypeScript (High Priority)
  - [ ] Configure TailwindCSS
  - [ ] Set up project structure
- [ ] Task 2: Set up GitHub Actions CI/CD pipeline
  - [ ] Configure build process
  - [ ] Set up GitHub Pages deployment
- [ ] Task 3: Configure GitHub OAuth integration (High Priority)
  - [ ] Implement OAuth flow
  - [ ] Set up secure token storage

## Core Data Models
- [ ] Task 4: Create base data models (High Priority)
  - [ ] Define Mindmap interface
  - [ ] Define Node (Character) interface
  - [ ] Define Relationship interface
- [ ] Task 5: Implement state management with Zustand
  - [ ] Set up store configuration
  - [ ] Create actions and selectors

## Storage Service
- [ ] Task 6: Implement LocalStorage service (High Priority)
  - [ ] Create save/load functions
  - [ ] Add auto-save functionality
- [ ] Task 7: Implement GitHub storage service
  - [ ] Create GitHub API integration
  - [ ] Implement repository operations
- [ ] Task 8: Create storage strategy switcher
  - [ ] Add configuration options
  - [ ] Implement storage provider pattern

## Canvas & Mindmap Core
- [ ] Task 9: Set up React Flow integration (High Priority)
  - [ ] Create base canvas component
  - [ ] Implement zoom and pan controls
- [ ] Task 10: Implement node management
  - [ ] Create custom node component
  - [ ] Add node creation functionality
  - [ ] Implement node editing
  - [ ] Add node deletion
- [ ] Task 11: Implement relationship management
  - [ ] Create custom edge component
  - [ ] Add relationship creation
  - [ ] Implement relationship editing
  - [ ] Add relationship deletion

## UI Components
- [ ] Task 12: Create main layout components
  - [ ] Implement responsive sidebar
  - [ ] Create toolbar component
- [ ] Task 13: Build character editor UI
  - [ ] Create form components
  - [ ] Add image upload functionality
- [ ] Task 14: Implement relationship editor UI
  - [ ] Create relationship type selector
  - [ ] Add relationship properties form
- [ ] Task 15: Create mindmap list view
  - [ ] Implement grid/list layout
  - [ ] Add sorting and filtering

## Search & Navigation
- [ ] Task 16: Implement character search
  - [ ] Create search component
  - [ ] Add search highlighting
- [ ] Task 17: Add canvas navigation features
  - [ ] Implement mini-map
  - [ ] Add zoom to fit functionality
  - [ ] Create node centering feature

## Import/Export
- [ ] Task 18: Implement JSON export (High Priority)
  - [ ] Create export function
  - [ ] Add download functionality
- [ ] Task 19: Implement JSON import
  - [ ] Create import validation
  - [ ] Add file upload handling
- [ ] Task 20: Add sharing functionality
  - [ ] Create public view mode
  - [ ] Implement share link generation

## Testing
- [ ] Task 21: Set up testing infrastructure
  - [ ] Configure Jest and Testing Library
  - [ ] Add test utilities
- [ ] Task 22: Write core functionality tests
  - [ ] Test storage services
  - [ ] Test state management
  - [ ] Test node operations
- [ ] Task 23: Write UI component tests
  - [ ] Test canvas interactions
  - [ ] Test form validations
- [ ] Task 24: Write integration tests
  - [ ] Test import/export flow
  - [ ] Test GitHub integration

## Documentation
- [ ] Task 25: Create technical documentation
  - [ ] Document architecture
  - [ ] Add API documentation
- [ ] Task 26: Write user documentation
  - [ ] Create usage guides
  - [ ] Add examples
- [ ] Task 27: Add inline code documentation
  - [ ] Document complex functions
  - [ ] Add TypeScript types documentation

## Performance & Optimization
- [ ] Task 28: Implement performance optimizations
  - [ ] Add React memo where needed
  - [ ] Optimize large canvas rendering
  - [ ] Add loading states
- [ ] Task 29: Add error handling
  - [ ] Implement error boundaries
  - [ ] Add user-friendly error messages

---
