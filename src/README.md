# Hệ Thống Quản Lý Phòng Khám

## Tổng Quan

Đây là phần backend của hệ thống quản lý phòng khám được xây dựng bằng Node.js. Hệ thống cho phép quản lý bác sĩ, bệnh nhân, lịch khám và các cuộc hẹn khám bệnh.

## Công Nghệ Sử Dụng

- Node.js
- Express.js
- Sequelize ORM
- PostgreSQL
- Babel
- Nodemailer
- JWT Authentication

## Tính Năng

- Quản lý bác sĩ
  - Xem danh sách bác sĩ nổi bật
  - Xem tất cả bác sĩ
  - Xem chi tiết bác sĩ
  - Cập nhật thông tin bác sĩ
- Quản lý lịch khám
  - Tạo lịch khám cho bác sĩ
  - Xem lịch khám theo ngày
  - Tạo nhiều lịch khám cùng lúc
- Quản lý bệnh nhân
  - Đặt lịch khám
  - Xem danh sách bệnh nhân của bác sĩ
- Quản lý hồ sơ bệnh án
  - Gửi đơn thuốc
  - Lưu lịch sử khám bệnh
- Thông báo qua email
  - Xác nhận lịch hẹn
  - Gửi đơn thuốc

## Cấu Trúc Thư Mục

```
nodejs/
├── src/
│   ├── config/         # Cấu hình database
│   ├── controllers/    # Xử lý logic điều khiển
│   ├── models/        # Mô hình dữ liệu
│   ├── routes/        # Định tuyến API
│   ├── services/      # Xử lý logic nghiệp vụ
│   └── server.js      # File khởi động server
├── .env
├── .babelrc
├── package.json
└── README.md
```

## Cài Đặt

1. Clone repository
2. Cài đặt các gói phụ thuộc:

```bash
npm install
```

3. Cấu hình biến môi trường trong file `.env`:

```
PORT=8080
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=****
DB_NAME=clinic
```

## Chạy Ứng Dụng

Môi trường phát triển:

```bash
npm start
```

Build cho môi trường production:

```bash
npm run build
npm run build-src
```

## API Endpoints

### Bác Sĩ

- `GET /api/doctor/top` - Lấy danh sách bác sĩ nổi bật
- `GET /api/doctor/all` - Lấy tất cả bác sĩ
- `GET /api/doctor/detail/:id` - Lấy chi tiết bác sĩ
- `POST /api/doctor/info` - Tạo/Cập nhật thông tin bác sĩ
- `GET /api/doctor/schedule/:date` - Lấy lịch khám theo ngày
- `POST /api/doctor/bulk-schedule` - Tạo nhiều lịch khám

### Bệnh Nhân

- `GET /api/doctor/patient-list` - Lấy danh sách bệnh nhân của bác sĩ
- `POST /api/doctor/send-remedy` - Gửi đơn thuốc cho bệnh nhân

## Các Gói Phụ Thuộc

- Express.js - Framework web
- Sequelize - ORM để thao tác database
- bcryptjs - Mã hóa mật khẩu
- dotenv - Cấu hình biến môi trường
- nodemailer - Gửi email
- body-parser - Xử lý request body
- cors - Xử lý Cross-origin resource sharing

## Gói Phát Triển

- Babel - Biên dịch JavaScript
- Nodemon - Server phát triển
- Sequelize CLI - Quản lý migration database

## Cơ Sở Dữ Liệu

Ứng dụng sử dụng PostgreSQL. Cần cài đặt và chạy PostgreSQL trước khi khởi động ứng dụng.

## Đóng Góp

1. Fork repository
2. Tạo nhánh tính năng mới
3. Commit thay đổi
4. Push lên nhánh
5. Tạo Pull Request

## Giấy Phép

ISC
