# Chef Ingredient Ordering System

Hệ thống đặt hàng nguyên liệu cho đầu bếp - Mở rộng cho dự án Tomato Food Delivery

## Tính năng mới

### Cho Đầu bếp (Chef):
- **Đăng nhập riêng**: Đầu bếp có interface riêng tại `/chef.html`
- **Xem danh sách nguyên liệu**: Xem tất cả nguyên liệu có sẵn với thông tin chi tiết
- **Tạo đơn đặt hàng**: Chọn nguyên liệu và số lượng cần thiết
- **Quản lý đơn hàng**: Xem trạng thái đơn hàng (chờ duyệt, đã duyệt, từ chối, hoàn thành)
- **Hủy đơn hàng**: Có thể hủy đơn hàng đang chờ duyệt

### Cho Admin:
- **Quản lý nguyên liệu**: Thêm, sửa, xóa nguyên liệu
- **Cập nhật tồn kho**: Thay đổi số lượng tồn kho trực tiếp
- **Duyệt đơn hàng**: Xem và duyệt/từ chối đơn đặt hàng từ đầu bếp
- **Thống kê**: Xem thống kê đơn hàng và tình trạng tồn kho

## Cài đặt và Chạy

### 1. Backend Setup
```bash
cd Backend
npm install
npm run setup  # Tạo user mẫu và dữ liệu nguyên liệu
npm run server
```

### 2. Admin Panel
```bash
cd Admin
npm install
npm run dev
```
Truy cập: http://localhost:5173

### 3. Chef Application
```bash
cd Frontend
npm install
npm run dev
```
- Customer App: http://localhost:5174
- Chef App: http://localhost:5174/chef.html

## Tài khoản và Bảo mật

### Admin
- **Bắt buộc đăng nhập**: Admin phải đăng nhập để truy cập panel
- **Tạo admin đầu tiên**: Chạy `npm run create-admin` để tạo admin
- **Default**: admin@tomato.com / admin123 (có thể cấu hình qua env)
- **Chức năng**: Quản lý nguyên liệu, duyệt đơn hàng, quản lý user

### Chef
- **Đăng ký riêng**: Chef tự đăng ký tài khoản với role "chef"
- **Xác thực nghiêm ngặt**: Chỉ chef được phép truy cập chef app
- **Chức năng**: Xem nguyên liệu, đặt hàng, theo dõi đơn hàng

## Cấu trúc Database

### User Model (Cập nhật)
```javascript
{
  name: String,
  email: String,
  password: String,
  role: ['customer', 'chef', 'admin'], // Thêm role
  cartData: Object
}
```

### Ingredient Model (Mới)
```javascript
{
  name: String,
  description: String,
  unit: String,          // kg, lít, cái, etc.
  pricePerUnit: Number,
  category: ['Thịt', 'Rau củ', 'Gia vị', 'Hải sản', 'Ngũ cốc', 'Sữa & trứng', 'Khác'],
  supplier: String,
  currentStock: Number,
  minStockLevel: Number,
  image: String,
  isActive: Boolean
}
```

### Ingredient Order Model (Mới)
```javascript
{
  chefId: ObjectId,
  chefName: String,
  items: [{
    ingredientId: ObjectId,
    ingredientName: String,
    quantity: Number,
    unit: String,
    pricePerUnit: Number,
    totalPrice: Number
  }],
  totalAmount: Number,
  status: ['pending', 'approved', 'rejected', 'completed'],
  requestedDate: Date,
  neededByDate: Date,
  notes: String,
  adminNotes: String,
  approvedBy: String,
  approvedDate: Date,
  rejectionReason: String
}
```

## API Endpoints

### Ingredient Management
- `GET /api/ingredient/list` - Lấy danh sách nguyên liệu (Chef, Admin)
- `GET /api/ingredient/listall` - Lấy tất cả nguyên liệu (Admin)
- `POST /api/ingredient/add` - Thêm nguyên liệu (Admin)
- `POST /api/ingredient/remove` - Xóa nguyên liệu (Admin)
- `POST /api/ingredient/update` - Cập nhật nguyên liệu (Admin)
- `POST /api/ingredient/updatestock` - Cập nhật tồn kho (Admin)

### Ingredient Orders
- `POST /api/ingredient-order/create` - Tạo đơn đặt hàng (Chef)
- `GET /api/ingredient-order/chef` - Lấy đơn hàng của chef (Chef)
- `GET /api/ingredient-order/all` - Lấy tất cả đơn hàng (Admin)
- `POST /api/ingredient-order/updatestatus` - Cập nhật trạng thái (Admin)
- `POST /api/ingredient-order/cancel` - Hủy đơn hàng (Chef)
- `GET /api/ingredient-order/details/:orderId` - Chi tiết đơn hàng (Chef, Admin)
- `GET /api/ingredient-order/stats` - Thống kê đơn hàng (Admin)

## Workflow

1. **Admin thêm nguyên liệu** vào hệ thống với thông tin đầy đủ
2. **Chef đăng nhập** vào hệ thống chef riêng biệt
3. **Chef xem nguyên liệu** có sẵn và tạo đơn đặt hàng
4. **Admin nhận thông báo** và duyệt/từ chối đơn hàng
5. **Chef theo dõi** trạng thái đơn hàng của mình

## Tính năng bảo mật

- **Role-based Authentication**: Phân quyền rõ ràng cho từng loại user
- **JWT Token**: Xác thực an toàn
- **Route Protection**: Middleware kiểm tra quyền truy cập
- **Input Validation**: Kiểm tra dữ liệu đầu vào

## Responsive Design

- Giao diện tương thích với mobile và desktop
- UI/UX thân thiện và dễ sử dụng
- Hiển thị trạng thái rõ ràng với màu sắc phân biệt

## Mở rộng trong tương lai

- Thêm notification real-time
- Tích hợp email thông báo
- Báo cáo chi tiết và analytics
- Quản lý nhà cung cấp
- Lịch sử giá nguyên liệu
