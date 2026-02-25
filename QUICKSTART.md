# 🚀 Hệ Thống Nhận Orders - Traocha

## ✨ Tính Năng

✅ Khách đặt hàng qua web  
✅ Orders tự động lưu vào Firebase Firestore  
✅ Bạn nhận email thông báo ngay lập tức  
✅ Dashboard quản lý tất cả orders  
✅ Xem trạng thái, chi tiết khách hàng, sản phẩm đặt

---

## 🎯 Setup Nhanh

### 1️⃣ Firebase & EmailJS Config (5 phút)

Làm theo hướng dẫn chi tiết trong file **[SETUP.md](./SETUP.md)**

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Tạo .env.local

Copy từ `.env.example` và điền config của bạn

### 4️⃣ Chạy Local

```bash
npm run dev
```

### 5️⃣ Deploy Vercel

```bash
git push
```

---

## 🎮 Sử Dụng

### 👥 Khách Hàng

1. Chọn sản phẩm → Thêm vào giỏ
2. Click **Giỏ Hàng** → **Tiến hành đặt hàng**
3. Điền thông tin giao hàng
4. Click **Xác nhận đặt** → Xong!

### 👨‍💼 Quản Lý (Bạn)

1. Click icon **📦 Package** trên navbar
2. Xem tất cả orders
3. Cập nhật trạng thái từ Firebase Console
4. Email tự động gửi khi có order mới

---

## 📊 Cấu Trúc

```
services/
  ├── firebaseConfig.ts      → Firebase init
  ├── orderService.ts        → Xử lý orders
  └── geminiService.ts       → AI Assistant (cũ)

components/
  ├── Cart.tsx              → Giỏ hàng + submit order
  ├── Orders.tsx            → Dashboard quản lý
  └── ...

.env.example               → Mẫu biến môi trường
.env.local                 → Biến thực tế (create từ .env.example)
SETUP.md                   → Hướng dẫn chi tiết
```

---

## 🔓 Security Notes

⚠️ **Hiện tại**: Mọi người có thể xem tất cả orders  
➡️ **Bảo mật sau**: Cần thêm admin authentication

---

## 🆘 Liên Hệ Support

Nếu cần hỏi gì về setup, check file SETUP.md trước nhé!

Happy selling! 🐨☕
