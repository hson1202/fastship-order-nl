# 🚀 FASTSHIP ORDER NL - Deployment Guide

## Hướng dẫn deploy lên Render

### 📋 Tổng quan
Ứng dụng FASTSHIP ORDER NL gồm 3 phần:
- **Backend** (Node.js API)
- **Frontend** (React Chef App)  
- **Admin** (React Admin Panel)

### 🔧 Environment Variables

#### Backend (.env)
```bash
MONGODB_URI=mongodb+srv://your-username:password@cluster.mongodb.net/fastship_order_nl
JWT_SECRET=your_super_secret_jwt_key_here
ADMIN_EMAIL=admin@fastship.com
ADMIN_PASSWORD=admin123
PORT=4000
```

#### Frontend (.env)
```bash
VITE_API_URL=https://your-backend-app.onrender.com
```

#### Admin (.env)
```bash
VITE_API_URL=https://your-backend-app.onrender.com
```

### 🚀 Deploy trên Render

#### 1. Deploy Backend
1. Tạo **Web Service** mới trên Render
2. Connect GitHub repository
3. Cấu hình:
   - **Name**: `fastship-order-nl-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd Backend && npm install`
   - **Start Command**: `cd Backend && npm start`
   - **Root Directory**: `/`

4. Thêm Environment Variables:
   ```
   MONGODB_URI=mongodb+srv://...
   JWT_SECRET=your_secret_key
   ADMIN_EMAIL=admin@fastship.com
   ADMIN_PASSWORD=admin123
   PORT=4000
   ```

#### 2. Deploy Frontend (Chef App)
1. Tạo **Static Site** mới trên Render
2. Connect GitHub repository
3. Cấu hình:
   - **Name**: `fastship-order-nl-chef`
   - **Build Command**: `cd Frontend && npm install && npm run build`
   - **Publish Directory**: `Frontend/dist`
   - **Root Directory**: `/`

4. Thêm Environment Variables:
   ```
   VITE_API_URL=https://fastship-order-nl-backend.onrender.com
   ```

#### 3. Deploy Admin Panel
1. Tạo **Static Site** mới trên Render
2. Connect GitHub repository
3. Cấu hình:
   - **Name**: `fastship-order-nl-admin`
   - **Build Command**: `cd Admin && npm install && npm run build`
   - **Publish Directory**: `Admin/dist`
   - **Root Directory**: `/`

4. Thêm Environment Variables:
   ```
   VITE_API_URL=https://fastship-order-nl-backend.onrender.com
   ```

### 📝 URLs sau khi deploy
- **Backend API**: `https://fastship-order-nl-backend.onrender.com`
- **Chef App**: `https://fastship-order-nl-chef.onrender.com`
- **Admin Panel**: `https://fastship-order-nl-admin.onrender.com`

### 🔐 Tài khoản mặc định
Sau khi deploy, chạy script tạo tài khoản:

**Admin**: `admin@fastship.com` / `admin123`
**Chef**: `chef@fastship.com` / `chef123456`

### 🔄 Cập nhật
Mỗi khi push code mới lên GitHub, Render sẽ tự động rebuild và deploy.

### 🧪 Test API
Import file `Postman_Collection_Chef_System.json` vào Postman và thay đổi:
```json
{
  "key": "baseUrl",
  "value": "https://fastship-order-nl-backend.onrender.com"
}
```

### ⚠️ Lưu ý quan trọng
1. **CORS**: Backend đã cấu hình CORS cho tất cả origins
2. **Database**: Sử dụng MongoDB Atlas cho production
3. **SSL**: Render tự động cung cấp HTTPS
4. **Cold Start**: Backend có thể mất 30s để wake up nếu không có traffic
5. **Environment Variables**: Luôn sử dụng config thay vì hardcode URLs
