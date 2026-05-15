# Kế hoạch Nâng cấp Tính năng và UI/UX cho Mavia Coffee

Bản kế hoạch này trình bày chi tiết cách triển khai các tính năng bạn vừa yêu cầu: Trang cá nhân, Bảo mật đăng nhập Admin, Cổng thanh toán tự động (PayOS), và cải thiện UI/UX.

> [!IMPORTANT]
> **Cần bạn xác nhận trước khi code:** Vui lòng đọc kỹ phần **Câu hỏi & Yêu cầu chuẩn bị** bên dưới. Đặc biệt là việc tạo tài khoản PayOS để lấy API Key.

---

## Câu hỏi & Yêu cầu chuẩn bị (User Action Required)

1. **Về Cổng thanh toán PayOS:**
   Tôi sẽ chọn **PayOS** (của Casso) vì nó hỗ trợ tạo mã VietQR động tự động xác nhận cực kỳ nhanh gọn và miễn phí cho startup. 
   - Bạn cần đăng ký một tài khoản tại [payos.vn](https://payos.vn/) và tạo một Kênh thanh toán.
   - Sau đó lấy 3 mã: `Client ID`, `API Key`, và `Checksum Key` để tôi cấu hình vào file `.env.local`. 
   - *Bạn có đồng ý dùng PayOS không?*
2. **Về Bảo mật Admin:**
   Để tránh tạo thêm bảng DB phức tạp, tôi sẽ chuyển đổi trang `/login` sang dùng đăng nhập Email/Password của Supabase. Những email nào được phép làm admin sẽ được cấu hình trong file `.env.local` (vd: `ADMIN_EMAILS="hoanghuy4991@gmail.com"`). Nếu sau này hệ thống phình to, ta sẽ dùng bảng `roles` sau. *Cách này có ổn với bạn ở giai đoạn hiện tại không?*

---

## Chi tiết Kế hoạch Triển khai (Proposed Changes)

### 1. Nâng cấp UI/UX Toàn diện (Skeletons & Toast UI)
Thay thế toàn bộ các thông báo `alert()` thô cứng bằng thư viện Toast mượt mà, đồng thời thêm hiệu ứng loading.
- Cài đặt thư viện: `npm install react-hot-toast`.
- **`src/app/layout.tsx`**: Tích hợp `<Toaster />` toàn cục.
- **`src/components/ProductCard/ProductCard.tsx`**: Đổi `alert()` thành `toast.success()`.
- **`src/components/Header/Header.tsx`**: Thêm hiệu ứng rung/nháy (pulse) cho Icon Giỏ hàng khi số lượng thay đổi.
- **`src/app/products/page.tsx`**: Thêm Loading Skeletons khi đang fetch data từ Supabase thay vì để trống màn hình.

### 2. Trang Cá Nhân (User Profile & Account)
Tạo một trang tổng quan để user quản lý thông tin và xem lịch sử đơn hàng.
- **`src/app/account/page.tsx` [NEW]**: Tạo layout mới có Sidebar gồm 2 tab: "Thông tin cá nhân" và "Lịch sử đơn hàng".
- **Thông tin cá nhân**: Form cho phép cập nhật Số điện thoại, Địa chỉ giao hàng mặc định lưu trực tiếp vào `user_metadata` của Supabase Auth (để không cần tạo thêm bảng DB mới).
- Lấy lại code từ `src/app/orders/page.tsx` chuyển vào tab "Lịch sử đơn hàng" của trang Account.
- **`src/components/Auth/GoogleLoginButton.tsx`**: Đổi link "Đơn hàng của tôi" thành "Tài khoản của tôi" trỏ về `/account`.

### 3. Bảo mật Đăng nhập Admin (Supabase Auth)
Chuyển đổi luồng đăng nhập Admin cứng sang hệ thống Auth của Supabase.
- **`src/app/login/page.tsx`**: Sửa lại form đăng nhập, sử dụng `supabase.auth.signInWithPassword({ email, password })`. Xóa logic check `admin / maviacf`.
- **Bảo mật Route `/admin`**: Bổ sung logic check trong layout hoặc page của Admin. Chỉ những tài khoản có email nằm trong danh sách Admin (cấu hình qua ENV) mới được truy cập, nếu không sẽ bị đá ra trang chủ.

### 4. Tích hợp Cổng thanh toán Tự động PayOS
Tạo quy trình gạch nợ tự động bằng mã VietQR động sinh ra từ PayOS.
- Cài đặt SDK: `npm install @payos/node`.
- **`src/app/api/payos/create/route.ts` [NEW]**: API tạo link thanh toán (Payment Link) gửi lên server PayOS, nhận về URL chứa mã QR động kèm số tiền và mã đơn hàng.
- **`src/app/api/payos/webhook/route.ts` [NEW]**: Webhook hứng data từ PayOS khi khách hàng chuyển khoản thành công. API này sẽ tự động update bảng `orders` set status = `paid`.
- **`src/app/checkout/page.tsx`**: 
  - Khi user chọn "Chuyển khoản VietQR", gọi API `/create` để lấy link thanh toán.
  - Redirect user sang trang thanh toán của PayOS.
  - Sau khi thanh toán xong, PayOS sẽ tự redirect về trang `/checkout/success`.

---

## Kế hoạch Kiểm thử (Verification Plan)

- **Manual Verification**:
  1. Login bằng Google, vào `/account`, cập nhật SĐT, Địa chỉ xem có lưu lại được không. Đặt hàng xem địa chỉ có tự động fill không.
  2. Bấm thêm vào giỏ hàng xem Toast có hiện lên đẹp không, icon giỏ hàng có nháy không.
  3. Truy cập `/login`, thử dùng email thường đăng nhập xem có vào được `/admin` không.
  4. Tạo một đơn hàng test với phương thức VietQR để xem quy trình tạo Payment Link từ PayOS có chạy mượt mà đến trang scan QR không.

Vui lòng cho tôi biết bạn có đồng ý với kế hoạch này và các giải pháp đã chọn (đặc biệt là việc dùng PayOS) không nhé. Bấm xác nhận hoặc phản hồi lại để tôi bắt tay vào code!
