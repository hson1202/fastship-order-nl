# 🚀 FASTSHIP ORDER NL

Hệ thống quản lý đặt hàng nguyên liệu cho đầu bếp - FASTSHIP ORDER NL

## 📋 Tổng quan

**FASTSHIP ORDER NL** là một hệ thống web application cho phép:
- **Chef**: Đặt yêu cầu nguyên liệu cần thiết
- **Admin**: Quản lý và duyệt các yêu cầu từ chef

## 🏗️ Kiến trúc hệ thống

```
FASTSHIP ORDER NL/
├── Backend/          # Node.js API Server
├── Frontend/         # React Chef App  
├── Admin/            # React Admin Panel
└── Documentation/    # API docs & guides
```

## ✨ Tính năng chính

### 👨‍🍳 Chef App
- ✅ Đăng nhập/đăng ký tài khoản chef
- ✅ Tạo yêu cầu đặt nguyên liệu 
- ✅ Xem danh sách yêu cầu đã gửi
- ✅ Theo dõi trạng thái duyệt
- ✅ Hủy yêu cầu đang chờ

### 🛠️ Admin Panel  
- ✅ Quản lý yêu cầu từ chef
- ✅ Duyệt/từ chối yêu cầu với modal chi tiết
- ✅ Tạo tài khoản chef mới
- ✅ Theo dõi giá ước tính/thực tế

## 🚀 Cài đặt & Chạy

### Yêu cầu hệ thống
- Node.js 16+
- MongoDB
- Git

### 1. Clone repository
\`\`\`bash
git clone https://github.com/yourusername/fastship-order-nl.git
cd fastship-order-nl
\`\`\`

### 2. Setup Backend
\`\`\`bash
cd Backend
npm install
cp env.example .env
# Cập nhật thông tin database trong .env
npm start
\`\`\`

### 3. Setup Frontend (Chef App)
\`\`\`bash
cd Frontend  
npm install
cp env.example .env
# Cập nhật API URL trong .env nếu cần
npm run dev
\`\`\`

### 4. Setup Admin Panel
\`\`\`bash
cd Admin
npm install  
cp env.example .env
# Cập nhật API URL trong .env nếu cần
npm start
\`\`\`

## 🌐 URLs Development

- **Backend API**: http://localhost:4000
- **Chef App**: http://localhost:5173  
- **Admin Panel**: http://localhost:3000

## 🔐 Tài khoản mặc định

### Admin
- **Email**: admin@fastship.com
- **Password**: admin123

### Chef  
- **Email**: chef@fastship.com
- **Password**: chef123456

## 🛠️ Công nghệ sử dụng

### Backend
- **Node.js** + Express.js
- **MongoDB** + Mongoose
- **JWT** Authentication
- **Bcrypt** Password hashing
- **Multer** File upload

### Frontend
- **React 18** + Vite
- **Axios** HTTP client
- **React Router** Navigation
- **CSS3** Styling

### Admin
- **React 18** + Vite  
- **React Toastify** Notifications
- **Custom Modal** Components

## 📦 API Endpoints

### Authentication
- `POST /api/user/login` - Đăng nhập
- `POST /api/user/register` - Đăng ký

### Ingredient Requests
- `GET /api/ingredient-request/chef` - Lấy yêu cầu của chef
- `POST /api/ingredient-request/create` - Tạo yêu cầu mới
- `GET /api/ingredient-request/all` - Lấy tất cả yêu cầu (admin)
- `POST /api/ingredient-request/updatestatus` - Cập nhật trạng thái
- `DELETE /api/ingredient-request/cancel/:id` - Hủy yêu cầu

## 🚀 Deploy lên Production

Xem file `DEPLOYMENT_GUIDE.md` để biết chi tiết cách deploy lên Render.

### Environment Variables cần thiết:

**Backend:**
\`\`\`
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
ADMIN_EMAIL=admin@fastship.com
ADMIN_PASSWORD=admin123
\`\`\`

**Frontend & Admin:**
\`\`\`
VITE_API_URL=https://your-backend-url.onrender.com
\`\`\`

## 🧪 Testing

Import file `Postman_Collection_Chef_System.json` vào Postman để test API.

## 📁 Cấu trúc thư mục

\`\`\`
FASTSHIP ORDER NL/
├── Backend/
│   ├── config/           # Database config
│   ├── controllers/      # API controllers
│   ├── middleware/       # Auth middleware
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── scripts/         # Utility scripts
│   └── uploads/         # File uploads
├── Frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── config/      # API configuration
│   │   └── assets/      # Static assets
│   └── public/
├── Admin/
│   ├── src/
│   │   ├── components/  # Admin components
│   │   ├── pages/       # Admin pages
│   │   └── config/      # API configuration
│   └── public/
└── Documentation/
    ├── DEPLOYMENT_GUIDE.md
    └── Postman_Collection_Chef_System.json
\`\`\`

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Tạo Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

Nếu có vấn đề, tạo issue trên GitHub hoặc liên hệ team phát triển.

---

**FASTSHIP ORDER NL** - Simplifying ingredient ordering for chefs 🍳