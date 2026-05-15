# Nhiệm vụ Triển khai (Task List)

- [x] **1. Cài đặt thư viện & UI/UX Fixes**
  - [x] Chạy lệnh cài đặt `react-hot-toast` và `@payos/node`.
  - [x] Tích hợp `<Toaster />` vào `src/app/layout.tsx`.
  - [x] Sửa `ProductCard.tsx` thay `alert()` bằng `toast.success()`.
  - [x] Cập nhật `Header.tsx` thêm hiệu ứng rung cho Icon Giỏ hàng.
  - [x] Thêm Loading Skeleton vào `src/app/products/page.tsx`.

- [x] **2. Trang Tài khoản (User Account)**
  - [x] Tạo `src/app/account/page.tsx` với 2 tab: Thông tin & Lịch sử đơn hàng.
  - [x] Cập nhật `GoogleLoginButton.tsx` trỏ link về `/account`.

- [x] **3. Bảo mật Admin**
  - [x] Sửa `src/app/login/page.tsx` để đăng nhập bằng Supabase thay vì hardcode.
  - [x] Bổ sung cơ chế check quyền Admin (bằng biến môi trường `NEXT_PUBLIC_ADMIN_EMAILS`).

- [x] **4. Tích hợp PayOS**
  - [x] Tạo API route `/api/payos/create/route.ts`.
  - [x] Tạo Webhook route `/api/payos/webhook/route.ts`.
  - [x] Cập nhật `src/app/checkout/page.tsx` xử lý tự động redirect tới Payment Link.
