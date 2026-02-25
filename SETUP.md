# 🎯 Hướng Dẫn Setup Hệ Thống Nhận Orders cho Traocha

## 📋 Tổng Quan

Hệ thống này sử dụng:

- **Firebase Firestore**: Lưu trữ đơn hàng
- **EmailJS**: Gửi email thông báo đơn hàng mới
- **React Frontend**: Hiển thị dashboard quản lý orders

---

## ⚙️ Step 1: Setup Firebase

### 1.1 Tạo Firebase Project

1. Truy cập [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"**
3. Đặt tên: `traocha-orders`
4. Bỏ check "Enable Google Analytics"
5. Click **"Create project"** → Đợi hoàn thành

### 1.2 Tạo Firestore Database

1. Vào Firebase Console → Chọn project `traocha-orders`
2. Sidebar trái → **"Build"** → **"Firestore Database"**
3. Click **"Create database"**
4. Chọn **"Start in production mode"**
5. Chọn vị trí: **Southeast Asia (asia-southeast1)** hoặc gần nhất
6. Click **"Enable"** → Đợi khởi tạo

### 1.3 Chỉnh sửa Firestore Security Rules

1. Vào **Firestore Database** → Tab **"Rules"**
2. Thay thế toàn bộ rules bằng đoạn này:

```firestore
rules_version = '3';
service cloud.firestore {
  match /databases/{database}/documents {
    match /orders/{orderId} {
      allow read, write: if true;
    }
  }
}
```

3. Click **"Publish"**

### 1.4 Lấy Firebase Config

1. Vào **Project Settings** (bánh răng góc trên cùng)
2. Tab **"General"**
3. Scroll down → Tìm mục **"Your apps"**
4. Click icon Web `</>` nếu chưa có, hoặc chọn app đã có
5. Copy toàn bộ config:

```javascript
const config = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "...",
};
```

---

## 🔐 Step 2: Setup EmailJS

### 2.1 Tạo EmailJS Account

1. Truy cập [EmailJS.com](https://www.emailjs.com/)
2. Click **"Sign Up Free"**
3. Điền thông tin → Click **"Create Account"**

### 2.2 Kết nối Email Service

1. Vào **Email Services** (Dashboard)
2. Click **"Create New Service"**
3. Chọn **"Gmail"** (hoặc email bạn muốn dùng)
4. Follow hướng dẫn:
   - Cho phép EmailJS truy cập Gmail (dùng App Password nếu có 2FA)
   - Lưu **Service ID** (VD: `service_xxxxx`)

### 2.3 Tạo Email Template

1. Vào **Email Templates**
2. Click **"Create New Template"**
3. Đặt tên template: `template_traocha_order`
4. Thay thế nội dung với cái này:

```html
Subject: 🎉 Đơn hàng mới từ {{from_name}} --- Xin chào! Bạn vừa nhận được một
đơn hàng mới: 📋 CHI TIẾT ĐƠN HÀNG - Mã đơn: {{order_id}} - Thời gian:
{{order_date}} 👤 KHÁCH HÀNG - Tên: {{from_name}} - SĐT: {{phone_number}} - Địa
chỉ: {{address}} - Ghi chú: {{note}} 📦 SẢN PHẨM {{items}} 💰 THANH TOÁN - Tạm
tính: {{subtotal}}đ - Phí ship: {{shipping_fee}}đ - Tổng cộng: {{total_price}}đ
--- Vào trang dashboard quản lý để xác nhận: [link dashboard - sẽ update sau]
Chúc bạn ngày tốt lành! TraoCha Team 🐨
```

5. Click **"Save"**
6. Copy **Template ID** (VD: `template_xxxxx`)

### 2.4 Lấy Public Key

1. Vào **Account** (Menu trên cùng)
2. Tab **"API Keys"**
3. Copy **Public Key** (VD: `xxxxx`)

---

## 🚀 Step 3: Setup Traocha Project

### 3.1 Cài Đặt Dependencies

```bash
cd e:\EXE\EXE\traocha
npm install
```

### 3.2 Tạo File .env.local

1. Tạo file `.env.local` trong thư mục `e:\EXE\EXE\traocha\`
2. Paste config Firebase + EmailJS:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id

VITE_EMAILJS_SERVICE_ID=service_xxxxx
VITE_EMAILJS_TEMPLATE_ID=template_traocha_order
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

### 3.3 Kiểm Tra Package.json

Package.json đã được update với:

- `firebase`
- `emailjs-com`

---

## 🧪 Step 4: Test Locally

### 4.1 Chạy Development Server

```bash
npm run dev
```

### 4.2 Test Order Flow

1. Mở web trên browser
2. Thêm sản phẩm vào giỏ
3. Click **"Giỏ Hàng"** → **"Tiến hành đặt hàng"**
4. Điền thông tin:
   - Họ tên: Nguyễn Văn A
   - SĐT: 0987654321
   - Địa chỉ: 123 Nguyễn Hue, TP.HCM
5. Click **"Xác nhận đặt"**
6. Kiểm tra:
   - ✅ Thành công → Thay đổi view
   - ✅ Email nhận được từ **thanhan15082004@gmail.com**
   - ✅ Dữ liệu lưu vào Firestore

### 4.3 Xem Orders Dashboard

1. Click icon **📦 Package** ở navbar (góc phải)
2. Xem danh sách tất cả orders
3. Click **"Làm mới"** để refresh dữ liệu

---

## 🎉 Step 5: Deploy lên Vercel

### 5.1 Update Environment Variables trên Vercel

1. Vào project Traocha trên Vercel Dashboard
2. **Settings** → **Environment Variables**
3. Thêm tất cả biến từ `.env.local`:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - v.v...

### 5.2 Deploy

```bash
git add .
git commit -m "feat: add order management system with Firebase and EmailJS"
git push
```

Vercel sẽ tự động deploy. Chúc mừng! 🎉

---

## 📞 Troubleshooting

### ❌ Lỗi: "Lỗi khi đặt hàng. Vui lòng thử lại"

- Kiểm tra Firebase config trong `.env.local`
- Kiểm tra Firestore Rules

### ❌ Không nhận được email

- Kiểm tra EmailJS Service ID & Template ID
- Kiểm tra EmailJS Public Key
- Kiểm tra Gmail permissions
- Kiểm tra spam folder

### ❌ Firebase bảo lỗi quota

- Vào Firebase Console → Quotas
- Firestore read/write đủ không

---

## 🔒 Bảo Mật (Cần Bổ Sung Sau)

Hiện tại:

- ✅ Anyone có thể xem tất cả orders (Firestore rules)
- ❌ Chưa có authentication cho admin dashboard

**Cải thiện sau:**

- Thêm password hoặc Google Auth cho admin
- Tạo protected routes
- Sử dụng Firestore Security Rules tốt hơn

---

## 📝 Ghi Chú

- Email sẽ gửi từ email được cấu hình trong EmailJS
- Khách vẫn không nhận email (chỉ owner nhận)
- Để khách nhận email: thêm thêm một template EmailJS khác

---

Hãy liên hệ nếu cần hỗ trợ thêm! 🚀
