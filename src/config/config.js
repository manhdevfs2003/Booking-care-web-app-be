require("dotenv").config();

module.exports = {
   development: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE_NAME,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: process.env.DB_DIALECT,
      dialectOptions: {
         ssl:
            process.env.DB_SSL === "true"
               ? {
                    require: true,
                    rejectUnauthorized: false,
                 }
               : {},
      },
      timezone: "+07:00", // Đặt timezone phù hợp
   },
   production: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE_NAME,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: process.env.DB_DIALECT,
      dialectOptions: {
         ssl:
            process.env.DB_SSL === "true"
               ? {
                    require: true,
                    rejectUnauthorized: false,
                 }
               : {},
      },
      timezone: "+07:00",
   },
};
