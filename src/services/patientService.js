import { defaults, times } from "lodash";
import db from "../models/index";
import { where } from "sequelize";
import { raw } from "body-parser";
import emailService from "./emailService";
require("dotenv").config();
import { v4 as uuidv4 } from "uuid";

let buildUrlEmail = (doctorId, token) => {
  let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;
  return result;
};
let postBookAppointment = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.doctorId || !data.date || !data.timeType || !data.fullName || !data.selectedGender || !data.address) {
        return resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      }
      let token = uuidv4();
      await emailService.sendSimpleEmail({
        receiversEmail: data.email,
        patientName: data.fullName,
        time: data.timeString,
        doctorName: data.doctorName,
        language: data.language,
        redirectLink: buildUrlEmail(data.doctorId, token),
      });

      let [user, created] = await db.User.findOrCreate({
        where: { email: data.email },
        defaults: {
          email: data.email,
          roleId: "R3",
          gender: data.selectedGender,
          address: data.address,
          firstName: data.fullName,
        },
      });

      // Cho phép đặt nhiều lịch hẹn nhưng không trùng bác sĩ
      let existingBooking = await db.Booking.findOne({
        where: {
          patientID: user.id,
          doctorId: data.doctorId,
        },
      });

      if (existingBooking) {
        return resolve({
          errCode: 2,
          errMessage: "You already have an appointment with this doctor on this date.",
        });
      }

      await db.Booking.create({
        statusId: "S1",
        doctorId: data.doctorId,
        patientID: user.id,
        date: data.date,
        timeType: data.timeType,
        token: token,
      });

      resolve({
        errCode: 0,
        errMessage: "Appointment booked successfully.",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let postVerifyBookedAppointment = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.token || !data.doctorId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let appointment = await db.Booking.findOne({
          where: {
            doctorId: data.doctorId,
            token: data.token,
            statusId: "S1",
          },
          raw: false,
        });
        if (appointment) {
          appointment.statusId = "S2";
          await appointment.save();
          resolve({
            errCode: 0,
            errMessage: "Success",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Booking not found",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  postBookAppointment: postBookAppointment,
  postVerifyBookedAppointment: postVerifyBookedAppointment,
};
