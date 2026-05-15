# Báo cáo Nâng cấp Hệ thống Mavia Coffee

Dưới đây là tổng hợp các công việc đã hoàn thiện theo kế hoạch nâng cấp:

## Thay đổi nổi bật (Changes Made)

1. **Giao diện & Trải nghiệm (UI/UX)**:
   - Đã cài đặt thư viện `react-hot-toast` và áp dụng hiển thị thông báo đẹp mắt ở tất cả các chức năng: Thêm giỏ hàng, Đăng nhập, Checkout. (Loại bỏ hoàn toàn các popup `alert()` xấu xí).
   - Biểu tượng Giỏ hàng trên thanh Header giờ đây sẽ **nhấp nháy (nhảy)** nhẹ mỗi khi khách hàng thêm một sản phẩm mới, thu hút sự chú ý.
   - Thêm hiệu ứng **Loading Skeletons** tại trang Danh sách sản phẩm, đem lại cảm giác app tải mượt mà hơn trong khi đợi dữ liệu.

2. **Trang Quản lý Tài khoản (User Account)**:
   - Thay thế trang `/orders` nghèo nàn bằng trang `/account` hoàn chỉnh với giao diện chia cột hiện đại.
   - Bổ sung chức năng **Cập nhật thông tin cá nhân**: Lưu số điện thoại, Họ tên, Địa chỉ giao hàng mặc định ngay trong Profile của Supabase.
   - Tích hợp **Lịch sử đơn hàng** vào trong tab thứ hai để khách tiện theo dõi trạng thái món hàng đã đặt.

3. **Bảo mật Đăng nhập Admin**:
   - Xóa bỏ việc lộ tài khoản hardcode trong mã nguồn. 
   - Đăng nhập Admin giờ đây sẽ gọi đến hàm Authenticate chuẩn của Supabase. 
   - Kiểm tra quyền truy cập thông qua danh sách Email chỉ định được lưu tại file `.env.local` ở server.

4. **Tích hợp cổng thanh toán PayOS (VietQR Tự động)**:
   - Viết 2 API (`/api/payos/create` và `/api/payos/webhook`) kết nối SDK của `@payos/node`.
   - Tại trang Checkout, nếu user chọn "Chuyển khoản VietQR", hệ thống sẽ chuyển hướng tới cổng PayOS chuyên nghiệp.
   - Sau khi khách hàng quét mã QR qua ứng dụng ngân hàng, PayOS tự động bắn webhook về hệ thống để set trạng thái đơn hàng thành **Paid (Đã thanh toán)**.

> [!WARNING]
> **Việc cần làm tiếp theo của bạn (Action Required):**
>
> **1. API Keys cho PayOS**
> Truy cập [payos.vn](https://payos.vn/), lấy các API Key và cập nhật vào file `.env.local` của bạn như sau:
> ```env
> PAYOS_CLIENT_ID="your-client-id"
> PAYOS_API_KEY="your-api-key"
> PAYOS_CHECKSUM_KEY="your-checksum-key"
> ```
> 
> **2. Cập nhật Database Supabase**
> Do luồng gạch nợ tự động của PayOS chỉ nhận Mã đơn hàng là dạng số (Integer/BigInt) nhưng Supabase mặc định sinh ID dạng UUID (chuỗi), tôi đã bổ sung trường dữ liệu `payos_order_code` tại lúc insert. Bạn **phải** tạo thêm cột này trong bảng `orders`:
> - Tên cột: `payos_order_code`
> - Kiểu dữ liệu: `int8` (hoặc `bigint`)
> - UNIQUE: Bật (Nên tạo index UNIQUE)
> 
> **3. Quyền Admin**
> Bạn hãy thêm dòng này vào `.env.local` với Email của bạn để có thể login vào trang Quản trị:
> ```env
> NEXT_PUBLIC_ADMIN_EMAILS="email1@gmail.com,email2@gmail.com"
> ```
