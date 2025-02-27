require("dotenv").config();
const nodemailer = require("nodemailer");

// Hàm tạo transporter chung
const createTransporter = () => {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });
};

// Hàm gửi email đơn giản
const sendSimpleEmail = async (dataSend) => {
  const transporter = createTransporter();
  await transporter.sendMail({
    from: '"Booking care🏥" <bookingcarevnauth@gmail.com>',
    to: dataSend.receiversEmail,
    subject: "Thông tin đặt lịch khám bệnh",
    html: getBodyHTMLEmail(dataSend),
  });
};

// Hàm gửi email có file đính kèm
const sendAttachment = async (dataSend) => {
  const transporter = createTransporter();
  await transporter.sendMail({
    from: '"Booking Care🏥" <bookingcarevnauth@gmail.com>',
    to: dataSend.email,
    subject: "Kết quả đặt lịch khám bệnh",
    html: getBodyHTMLEmailRemedy(dataSend),
    attachments: [
      {
        filename: `remedy-${dataSend.patientId}-${Date.now()}.png`,
        content: dataSend.imgBase64.split("base64,")[1],
        encoding: "base64",
      },
    ],
  });
};

// Hàm tạo nội dung email đặt lịch khám
const getBodyHTMLEmail = (dataSend) => {
  const message = {
    vi: `
      <h3>Xin chào ${dataSend.patientName}!</h3>
      <p>Bạn nhận được email này vì đã thực hiện một yêu cầu tại <b>Booking care</b>.</p>
      <p>Vui lòng nhấn vào liên kết bên dưới để hoàn tất yêu cầu của bạn:</p>
      <a href="${dataSend.redirectLink}" target="_blank" style="color: blue; font-weight: bold;">
        👉 Nhấn vào đây để tiếp tục
      </a>
      <p>Nếu bạn không yêu cầu, vui lòng bỏ qua email này.</p>
      <p>Trân trọng,<br><b>Booking care</b></p>
    `,
    en: `
      <h3>Hello ${dataSend.patientName}!</h3>
      <p>You received this email because you made a request at <b>Booking care</b>.</p>
      <p>Please click the link below to complete your request:</p>
      <a href="${dataSend.redirectLink}" target="_blank" style="color: blue; font-weight: bold;">
        👉 Click here to continue
      </a>
      <p>If you did not make this request, please ignore this email.</p>
      <p>Best regards,<br><b>Booking care</b></p>
    `,
  };
  return message[dataSend.language] || message.en;
};

// Hàm tạo nội dung email kết quả khám
const getBodyHTMLEmailRemedy = (dataSend) => {
  const message = {
    vi: `
      <h3>Xin chào ${dataSend.patientName}!</h3>
      <p>Bạn nhận được email này vì đã khám bệnh tại <b>Booking care</b>.</p>
      <p>Vui lòng kiểm tra tập tin đính kèm để xem kết quả khám bệnh.</p>
      <p>Nếu có thắc mắc, vui lòng liên hệ <a href="mailto:bookingcarevnauth@gmail.com">bookingcarevnauth@gmail.com</a>.</p>
      <p>Chúc bạn sức khỏe!<br><b>Booking care</b></p>
    `,
    en: `
      <h3>Hello ${dataSend.patientName}!</h3>
      <p>You received this email because you had a medical checkup at <b>Booking care</b>.</p>
      <p>Please check the attached file for your medical results.</p>
      <p>If you have any questions, please contact us at <a href="mailto:bookingcarevnauth@gmail.com">bookingcarevnauth@gmail.com
</a>.</p>
      <p>Wishing you good health!<br><b>Booking care</b></p>
    `,
  };
  return message[dataSend.language] || message.en;
};

module.exports = { sendSimpleEmail, sendAttachment };
