# Changelog

## [1.0.0-refactor] - 2026-03-18

### 🚀 Tính năng & Cải tiến (Features & Improvements)
- **Cải thiện UX Đăng nhập và Đăng ký**: Tích hợp hiển thị lỗi thời gian thực ngay bên dưới mỗi ô nhập liệu thay vì bật cảnh báo chung. Validation cho email, mật khẩu và xác nhận mật khẩu giờ đây rõ ràng và tức thì hơn.
- **Thêm trạng thái Loading**: Nút bấm `Đăng nhập` và `Đăng ký` có thêm icon quay (spinner) nhờ trạng thái `isLoading`, ngăn người dùng bấm nhiều lần.

### 🛠 Thay đổi Kiến trúc và Code (Refactoring)
- **Tách Component UI dùng chung**: Tạo ra thư mục `src/components/ui/` với các base component:
  - `Input.tsx`: Component đóng gói thẻ `<input>` cơ bản, tích hợp class linh hoạt qua `clsx` và `tailwind-merge`, có khả năng hiển thị viền đỏ và text lỗi khi Validation thất bại.
  - `Button.tsx`: Đóng gói thẻ `<button>` cơ bản, tích hợp chức năng hiển thị spinner loading tự động.
- **Quản lý Form chuyên nghiệp hơn**:
  - Tích hợp thư viện `react-hook-form` để thay thế cho việc dùng quá nhiều `useState` rời rạc ở `LoginForm` và `RegisterForm`.
  - Tích hợp thư viện `zod` để định nghĩa schema validation mạnh mẽ trực tiếp ở phía Frontend (ví dụ: bắt buộc ký tự đặc biệt, mật khẩu trùng khớp).
- **Làm sạch AuthContext**:
  - Chuyển toàn bộ logic kiểm tra mật khẩu dài ngắn/ký tự đặc biệt ra khỏi `AuthContext.tsx`. Context giờ đây chỉ nhận tham số và gọi API (Mô phỏng).

### 🐛 Sửa lỗi (Bug Fixes)
- Sửa các cảnh báo (Warnings) do TypeScript bắt lỗi biến không sử dụng (unused variables).
- Cài đặt thêm thư viện `react-icons` vốn đang bị thiếu khi import bên trong form Job.

### 📦 Dependencies (Thư viện cài đặt thêm)
- `react-hook-form`
- `zod`, `@hookform/resolvers`
- `lucide-react` (để lấy icon spinner loading)
- `clsx`, `tailwind-merge` (tiện ích trộn class Tailwind)
- `react-icons` (thiếu trong project nguyên bản)
