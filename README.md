# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
appsettings.json (Cái Két sắt): Nơi cất giữ Mã bí mật (Key) của bạn. Chỉ có Server mới biết mã này để tạo và kiểm tra "Thẻ ra vào".

Program.cs
 (Kỹ sư trưởng): Người thiết lập các quy tắc cho toàn bộ hệ thống. Nó đọc mã bí mật từ cái Két sắt (appsettings.json) và dặn máy tính: "Khi có ai trình thẻ ra, hãy dùng mã này để kiểm tra xem thẻ thật hay giả".

AuthController.cs
 (Nơi cấp thẻ): Kiểm tra email/mật khẩu. Nếu đúng, nó sẽ dùng mã bí mật để in ra một cái Thẻ ra vào (Token) có ghi sẵn ID của người đó.

JobsController.cs
 (Phòng VIP): Là nơi chứa các chức năng (thêm, sửa, xóa công việc). Nó sẽ gọi người bảo vệ (Authorize) để kiểm soát thẻ trước khi cho vào.


 Bước 1: Đăng nhập (Lấy thẻ)
Bạn gửi Email và Mật khẩu đến AuthController.AuthController
 kiểm tra trong Cơ sở dữ liệu. Nếu đúng, nó vào appsettings.json lấy cái Mã bí mật.
Nó in ra một cái Token (Thẻ ra vào) có chứa số ID = 1 (ví dụ là ID của bạn).
Server gửi cái Token này về máy bạn.
Bước 2: Thêm một công việc (Dùng thẻ)
Bạn nhấn "Thêm công việc" trên giao diện. Máy tính của bạn sẽ gửi thông tin công việc kèm theo cái Token đã nhận ở Bước 1 đến 

JobsController
.

Program.cs
 (Người bảo vệ) chặn lại ở cửa. Nó dùng Mã bí mật để quét cái Token đó.
Nếu thẻ giả/hết hạn: Nó đuổi về ngay (Lỗi 401).
Nếu thẻ thật: Nó đọc thấy ID = 1 trên thẻ và chuyển thông tin này cho 

JobsController
.

JobsController
 nhận lệnh. Nó tự lấy số ID = 1 đó để điền vào cột 

UserId
 trong bảng Công việc.
Dữ liệu được lưu vào Database đúng tên của bạn.