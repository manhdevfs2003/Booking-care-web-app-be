const { add } = require("lodash");
const db = require("../models");
let createClinic = (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         if (
            !data.name ||
            !data.address ||
            !data.descriptionHTML ||
            !data.descriptionMarkdown
         ) {
            resolve({
               errCode: -1,
               errMessage: "Missing required fields",
            });
         } else {
            await db.Clinic.create({
               name: data.name,
               address: data.address,
               image: data.imageBase64,
               descriptionHTML: data.descriptionHTML,
               descriptionMarkdown: data.descriptionMarkdown,
            });
            resolve({
               errCode: 0,
               message: "Create new specialty successfully",
            });
         }
      } catch (e) {
         reject(e);
      }
   });
};
let getAllClinic = () => {
   return new Promise(async (resolve, reject) => {
      try {
         let data = await db.Clinic.findAll({});
         if (data && data.length > 0) {
            data.map((item) => {
               item.image = new Buffer.from(item.image, "base64").toString(
                  "binary"
               );
               return item;
            });
         }
         resolve({
            errMessage: "Get all specialty successfully",
            errCode: 0,
            data: data,
         });
      } catch (e) {
         reject(e);
      }
   });
};
let getDetailClinicById = async (inputId) => {
   return new Promise(async (resolve, reject) => {
      try {
         if (!inputId) {
            resolve({
               errCode: -1,
               errMessage: "Missing required fields",
            });
         } else {
            let data = await db.Clinic.findOne({
               where: { id: inputId },
               attributes: [
                  "address",
                  "name",
                  "descriptionHTML",
                  "descriptionMarkdown",
               ],
            });

            if (data) {
               let doctorClinic = [];
               doctorClinic = await db.Doctor_Infor.findAll({
                  where: { clinicId: inputId },
                  attributes: ["doctorId", "provinceId"],
               });

               data.doctorClinic = doctorClinic;
            } else data = {};

            resolve({
               errCode: 0,
               errMessage: "Get detail specialty successfully",
               data: data,
            });
         }
      } catch (e) {
         reject(e);
      }
   });
};
module.exports = {
   createClinic: createClinic,
   getAllClinic: getAllClinic,
   getDetailClinicById: getDetailClinicById,
};
