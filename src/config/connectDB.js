const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
   process.env.DB_DATABASE_NAME, // Database name
   process.env.DB_USERNAME, // User (tenant)
   process.env.DB_PASSWORD, // Password
   {
      host: process.env.DB_HOST, // Host của transaction pooler
      port: process.env.DB_PORT, // Port của transaction pooler
      dialect: process.env.DB_DIALECT, // PostgreSQL
      logging: false, // Tắt log SQL
      dialectOptions: {
         ssl:
            process.env.DB_SSL === "true"
               ? {
                    require: true,
                    rejectUnauthorized: false, // Cho phép kết nối với chứng chỉ tự ký
                 }
               : {},
      },
      query: {
         raw: true, // Trả về kết quả dạng object thuần
      },
      timezone: "+07:00", // Đặt timezone cho ứng dụng
   }
);

const connectDB = async () => {
   try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
   } catch (error) {
      console.error("Unable to connect to the database:", error.message);
   }
};

module.exports = connectDB;
