# 🎧 Music Chat – Spotify Clone with Real-Time Social Features

**Music Chat** là một ứng dụng web mô phỏng Spotify, kết hợp tính năng phát nhạc với trò chuyện thời gian thực.  
Người dùng có thể nghe nhạc, khám phá album và xem bạn bè đang nghe gì – tất cả trong một giao diện hiện đại và thân thiện.

---

## 🚀 Tính năng nổi bật

- **Phát nhạc thông minh**: Phát, tạm dừng, tua bài hát, điều chỉnh âm lượng và hiển thị thời lượng chính xác.
- **Trình điều khiển nâng cao**: Hỗ trợ lặp lại, xáo trộn và bật/tắt âm lượng bằng biểu tượng.
- **Hoạt động bạn bè**: Xem bạn bè đang nghe gì, lọc theo trạng thái online hoặc đang phát nhạc.
- **Giao diện album chi tiết**: Hiển thị danh sách bài hát, thời lượng và ngày phát hành.
- **Trò chuyện thời gian thực**: Kết nối và trò chuyện với bạn bè có cùng sở thích âm nhạc.
- **Giao diện responsive**: Tối ưu cho cả desktop và mobile, hỗ trợ dark mode.

---

## 🛠️ Công nghệ sử dụng

- **Frontend**: React, Zustand, Tailwind CSS, Clerk (xác thực), Lucide Icons.
- **Backend**: Node.js, Express, MongoDB.
- **Realtime**: Socket.io.
- **Xác thực**: Clerk.
- **Triển khai**: Vercel (frontend), Render hoặc Railway (backend).

---

## 📸 Giao diện



![Giao diện chính](./screenshots/home.png)  
![Hoạt động bạn bè](./screenshots/friends-activity.png)  
![Album chi tiết](./screenshots/album.png)

---

## 📦 Cài đặt & chạy thử

### 1. Clone dự án

```
git clone https://github.com/thoangne/Music-Chat.git
cd Music-Chat ```
### 2. Cài đặt frontend
```
cd frontend
npm install  ```
### 3. Cài đặt backend
```
cd ../backend
npm install
 ```
### 4. Cấu hình biến môi trường
Tạo file .env trong thư mục backend với nội dung:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLERK_SECRET_KEY=your_clerk_secret_key
 ```
### 5. Chạy ứng dụng
Backend (trong thư mục backend):
```
npm run dev ```
Frontend (trong thư mục frontend):
```
npm run dev ```
## 📌 Ghi chú
Đảm bảo đã cài đặt Node.js và MongoDB trên máy.

Sử dụng Clerk để quản lý xác thực người dùng.

Ứng dụng hỗ trợ responsive và dark mode.

## 📄 Giấy phép
Dự án được phát hành dưới giấy phép MIT.
```
Lưu ý: Dự án này được xây dựng với mục đích học tập và không nhằm mục đích thương mại.
```
